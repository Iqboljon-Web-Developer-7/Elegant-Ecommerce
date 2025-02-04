import { FC, useMemo, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import heartIcon from "@/assets/icons/heart.svg";
import redHeartIcon from "@/assets/icons/red-heart.svg";
import { ProductDataProps } from "@/lib/types";
import { client, urlFor } from "@/utils/Client";
import { v4 as uuidv4 } from "uuid";
import InfoLoadingSkeleton from "./InfoLoadingSkeleton";
import { SANITY_USER_WISHLIST } from "@/utils/Data";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ToastAction } from "@radix-ui/react-toast";

const ProductData: FC<ProductDataProps> = ({
  productData,
  changeParam,
  selectedVariant,
  productColor,
  productVariant,
  productQuantity,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Parse user info once per component lifecycle.
  const userInfo = useMemo(() => {
    const info = localStorage.getItem("userInfo");
    return info ? JSON.parse(info) : null;
  }, []);

  // Set default parameters if not provided.
  useEffect(() => {
    if (productData && !productColor && !productVariant) {
      changeParam("color", productData.colors[0]?.name);
      changeParam("variant", productData.variants[0]?.title);
    }
  }, [productData, productColor, productVariant, changeParam]);

  // Check if the product is in the user's wishlist.
  useEffect(() => {
    const checkIfSaved = async () => {
      if (userInfo && productData) {
        try {
          const userWishlist = await client.fetch(
            SANITY_USER_WISHLIST(userInfo._id)
          );
          if (userWishlist) {
            const exists = userWishlist.items.some(
              (item: any) =>
                item.product._ref === productData._id &&
                item.color === productColor &&
                item.variant === productVariant
            );
            setIsInWishlist(exists);
          }
        } catch (error) {
          console.error("Error checking wishlist:", error);
        }
      }
    };
    checkIfSaved();
  }, [userInfo, productData, productColor, productVariant]);

  // Render variants.
  const Variants = useMemo(() => {
    return productData?.variants?.map((variant) => {
      const isActive = variant.title === productVariant;
      const isOutOfStock = variant.stock === 0;
      return (
        <p
          key={variant._key}
          className={`py-1 px-2 border rounded-lg text-sm lg:text-base cursor-pointer ${
            isActive ? "border-black" : "border-gray-300"
          } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:border-black"} transition`}
          onClick={() => {
            if (!isOutOfStock) changeParam("variant", variant.title);
          }}
          title={isOutOfStock ? "Out of stock" : ""}
        >
          {variant.title} {isOutOfStock && "(Out of Stock)"}
        </p>
      );
    });
  }, [productData, productVariant, changeParam]);

  // Render available colors.
  const Colors = useMemo(() => {
    const availableColors = productData?.variants
      ?.filter((variant) => variant.title === productVariant)
      .map((variant) => variant.color);

    // Set a default color if none is selected.
    if (availableColors && !productColor) {
      changeParam("color", availableColors[0]);
    }

    return productData?.colors?.map((color, index) => {
      const imageRef = productData.images.find(
        (img) => img.color === color.name
      )?.images[0]?.image.asset._ref;
      const isAvailable = availableColors?.includes(color.name);
      return (
        <div key={index} className="flex flex-wrap gap-4 p-2">
          <img
            src={imageRef ? urlFor(imageRef).toString() : ""}
            alt={`${color.name} product`}
            width={64}
            height={64}
            className={`w-16 h-16 border ${
              color.name === productColor
                ? "border-black"
                : "border-transparent"
            } hover:p-[.1rem] duration-200 cursor-pointer ${
              !isAvailable ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title={!isAvailable ? "Not available for the selected variant" : ""}
            onClick={() => {
              if (isAvailable) changeParam("color", color.name);
            }}
          />
        </div>
      );
    });
  }, [productData, productVariant, productColor, changeParam]);

  // Render categories.
  const Categories = useMemo(() => {
    return productData?.categories?.map((item, index) => (
      <span key={item._key}>
        {item.title}
        {productData?.categories?.length > index + 1 && ", "}
      </span>
    ));
  }, [productData]);

  // Helper to check login status and redirect if necessary.
  const requireLogin = useCallback(() => {
    if (!userInfo?._id) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to the wishlist.",
        variant: "destructive",
        action: (
          <ToastAction altText="Try again">
            <Button
              onClick={() => {
                sessionStorage.setItem("returnUrl", window.location.pathname);
                navigate("/auth/login");
              }}
              className="shadow-md hover:shadow-none hover:bg-neutral-700"
            >
              Login
            </Button>
          </ToastAction>
        ),
      });
      return false;
    }
    return true;
  }, [userInfo, toast, navigate]);

  // Function to add the product to the wishlist.
  const saveWishlist = useCallback(
    async (
      userId: string,
      productId: number,
      color: string | null,
      variant: string | null
    ) => {
      setIsLoading(true);
      try {
        let userWishlist = await client.fetch(SANITY_USER_WISHLIST(userId));
        if (!userWishlist) {
          userWishlist = await client.create({
            _type: "wishlist",
            userId,
            name: `${userInfo?.username} Wishlist`,
            items: [
              {
                _key: uuidv4(),
                product: { _type: "reference", _ref: productId },
                color,
                variant,
              },
            ],
          });
          toast({
            description: "Wishlist created and product added successfully!",
          });
        } else {
          const duplicate = userWishlist.items.some(
            (item: any) =>
              item.product._ref === productId &&
              item.color === color &&
              item.variant === variant
          );
          if (!duplicate) {
            await client
              .patch(userWishlist._id)
              .setIfMissing({ items: [] })
              .append("items", [
                {
                  _key: uuidv4(),
                  product: { _type: "reference", _ref: productId },
                  color,
                  variant,
                },
              ])
              .commit();
            toast({
              description: "Product added to wishlist successfully!",
            });
            setIsInWishlist(true);
          } else {
            toast({
              description: "Item already exists in the wishlist.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        toast({
          title: "Error adding to wishlist!",
          description: `${error}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [userInfo, toast]
  );

  // Function to remove the product from the wishlist.
  const removeWishlist = useCallback(
    async (
      userId: string,
      productId: number,
      color: string | null,
      variant: string | null
    ) => {
      setIsLoading(true);
      try {
        const userWishlist = await client.fetch(SANITY_USER_WISHLIST(userId));
        if (userWishlist) {
          const filteredItems = userWishlist.items.filter(
            (item: any) =>
              !(
                item.product._ref === productId &&
                item.color === color &&
                item.variant === variant
              )
          );
          await client
            .patch(userWishlist._id)
            .set({ items: filteredItems })
            .commit();
          toast({
            description: "Product removed from wishlist successfully!",
          });
          setIsInWishlist(false);
        }
      } catch (error) {
        toast({
          title: "Error removing from wishlist!",
          description: `${error}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  // Handlers for adding and removing wishlist items.
  const handleAddWishlist = useCallback(async () => {
    if (!requireLogin()) return;
    await saveWishlist(
      userInfo._id,
      productData!._id,
      productColor,
      productVariant
    );
  }, [
    requireLogin,
    saveWishlist,
    userInfo,
    productData,
    productColor,
    productVariant,
  ]);

  const handleRemoveWishlist = useCallback(async () => {
    if (!requireLogin()) return;
    await removeWishlist(
      userInfo._id,
      productData!._id,
      productColor,
      productVariant
    );
  }, [
    requireLogin,
    removeWishlist,
    userInfo,
    productData,
    productColor,
    productVariant,
  ]);

  if (!productData) return <InfoLoadingSkeleton />;

  return (
    <div className="singleProduct__top--texts flex-grow self-stretch flex flex-col gap-6">
      <h4 className="text-neutral-700">{productData.title}</h4>
      <p className="text-neutral-400 inter text-sm lg:text-base">
        {productData.description}
      </p>
      <div className="flex items-center gap-3">
        <h6>${selectedVariant?.salePrice}</h6>
        <span className="fs-20 line-through text-neutral-400">
          ${selectedVariant?.price}
        </span>
      </div>
      <hr />
      <div className="additionalInfo flex flex-wrap gap-2">{Variants}</div>
      <div className="colors flex mt-2 gap-2 flex-wrap">
        <div>
          <p className="text-sm text-neutral-400">Choose Color {">"}</p>
          <p className="mt-2 capitalize">{productColor}</p>
          <div className="flex mt-4 gap-2">{Colors}</div>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Product Stock {">"}</p>
          <p className="mt-2 capitalize">{selectedVariant?.stock} available</p>
        </div>
      </div>
      <div className="user-collections flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between gap-6">
          <div className="counter flex items-center justify-center bg-neutral-200 rounded-lg">
            <Button
              onClick={() => {
                if (productQuantity > 1)
                  changeParam("quantity", productQuantity - 1);
              }}
              className="bg-transparent shadow-none text-black group"
            >
              <span className="group-hover:text-white">-</span>
            </Button>
            <span className="px-3">{productQuantity}</span>
            <Button
              onClick={() => {
                if (productQuantity < selectedVariant?.stock)
                  changeParam("quantity", productQuantity + 1);
              }}
              className="bg-transparent shadow-none text-black group"
            >
              <span className="group-hover:text-white">+</span>
            </Button>
          </div>
          <Button
            className={`group w-full transition-all duration-200 hover:bg-red-50 hover:border-none hover:shadow-md ${isLoading && "!bg-black"}`}
            variant={"outline"}
          >
            {isLoading ? (
              <div className="loader w-10 h-10"></div>
            ) : isInWishlist ? (
              <div
                onClick={handleRemoveWishlist}
                className="font-normal flex-center gap-2 w-full h-full"
              >
                <img src={redHeartIcon} alt="Saved" />
                Saved
              </div>
            ) : (
              <div
                onClick={handleAddWishlist}
                className="flex-center gap-2 w-full h-full"
              >
                <img src={heartIcon} alt="Wishlist" width={18} height={18} />
                <span className="font-normal">Wishlist</span>
              </div>
            )}
          </Button>
        </div>
        <Button className="w-full hover:bg-secondary-green duration-200">
          Add to Cart
        </Button>
      </div>
      <div className="border-t pt-6 mt-2 inter text-xs flex flex-col gap-2">
        <div className="flex">
          <p className="text-neutral-400 min-w-32">SKU</p>
          <p>{selectedVariant?.sku || productData.sku}</p>
        </div>
        <div className="flex">
          <p className="text-neutral-400 min-w-32">CATEGORY</p>
          <p>{Categories}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductData;
