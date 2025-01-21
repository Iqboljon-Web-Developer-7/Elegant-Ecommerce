import { FC, useMemo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import heartIcon from "@/assets/icons/heart.svg";
import { ProductDataProps } from "@/lib/types";
import { client, urlFor } from "@/utils/Client";
import { v4 as uuidv4 } from "uuid";
import InfoLoadingSkeleton from "./InfoLoadingSkeleton";
import { SANITY_USER_WISHLIST } from "@/utils/Data";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom"; // Add useNavigate for navigation
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
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    if (productData && !productColor && !productVariant) {
      changeParam("color", productData.colors[0]?.name);
      changeParam("variant", productData.variants[0]?.title);
    }
  }, [productData]);

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  useEffect(() => {
    const checkIfSaved = async () => {
      if (userInfo && productData) {
        const userWishlist = await client.fetch(
          SANITY_USER_WISHLIST(userInfo._id)
        );
        if (userWishlist) {
          const isDuplicate = userWishlist.items.some(
            (item: any) =>
              item.product._ref === productData._id &&
              item.color === productColor &&
              item.variant === productVariant
          );
          setIsSaved(isDuplicate);
        }
      }
    };
    checkIfSaved();
  }, [productData, productColor, productVariant]);

  const Variants = useMemo(
    () =>
      productData?.variants?.map((variant) => (
        <p
          className={`py-1 px-2 border rounded-lg text-sm lg:text-base cursor-pointer ${
            variant.title === productVariant
              ? "border-black"
              : "border-gray-300"
          } ${
            variant.stock === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-black"
          } transition`}
          key={variant._key}
          onClick={() =>
            variant.stock > 0 && changeParam("variant", variant.title)
          }
          title={variant.stock === 0 ? "Out of stock" : ""}
        >
          {variant.title} {variant.stock === 0 ? "(Out of Stock)" : ""}
        </p>
      )),
    [productVariant, productData, changeParam]
  );

  const Colors = useMemo(() => {
    const availableColorsForSelectedVariant = productData?.variants
      ?.filter((variant) => variant.title === productVariant)
      .map((variant) => variant.color);

    if (availableColorsForSelectedVariant)
      changeParam("color", availableColorsForSelectedVariant[0]);

    return productData?.colors?.map((color, index) => {
      const img = productData.images.find((image) => image.color === color.name)
        ?.images[0]?.image.asset._ref;
      const isAvailable = availableColorsForSelectedVariant?.includes(
        color.name
      );

      return (
        <div key={index} className="flex flex-wrap gap-4 p-2">
          <img
            src={img && urlFor(img).toString()}
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
  }, [productColor, productVariant, productData, changeParam]);

  const Categories = productData?.categories?.map((item, index) => (
    <span key={item._key}>
      {item.title}
      {productData?.categories?.length > index + 1 && ","}{" "}
    </span>
  ));

  const saveWishlist = async (
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
          userId: userId,
          name: `${userInfo?.username} Wishlist`,
          items: [
            {
              _key: uuidv4(),
              product: { _type: "reference", _ref: productId },
              color: color,
              variant: variant,
            },
          ],
        });
        toast({
          description: "Wishlist created and product added successfully!",
        });
      } else {
        const isDuplicate = userWishlist.items.some(
          (item: any) =>
            item.product._ref === productId &&
            item.color === color &&
            item.variant === variant
        );

        if (!isDuplicate) {
          await client
            .patch(userWishlist._id)
            .setIfMissing({ items: [] })
            .append("items", [
              {
                _key: uuidv4(),
                product: { _type: "reference", _ref: productId },
                color: color,
                variant: variant,
              },
            ])
            .commit();
          toast({
            description: "Wishlist created and product added successfully!",
          });
          setIsSaved(true);
        } else {
          toast({
            description: "Item already exists in the wishlist.",
            variant: "destructive",
          });
        }
      }
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error adding to wishlist!",
        description: `${error}`,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    sessionStorage.setItem("returnUrl", window.location.pathname);
    navigate("/auth/login");
  };
  if (!productData) return <InfoLoadingSkeleton />;

  return (
    <div className="singleProduct__top--texts flex-grow self-stretch flex flex-col gap-6">
      <h4 className="text-neutral-700">{productData?.title}</h4>
      <p className="text-neutral-400 inter text-sm lg:text-base">
        {productData?.description}
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
                productQuantity && changeParam("quantity", productQuantity - 1);
              }}
              className="bg-transparent shadow-none text-black group"
            >
              <span className="group-hover:text-white">-</span>
            </Button>
            <span className="px-3">{productQuantity}</span>
            <Button
              onClick={() => {
                productQuantity < +selectedVariant?.stock! &&
                  changeParam("quantity", productQuantity + 1);
              }}
              className="bg-transparent shadow-none text-black group"
            >
              <span className="group-hover:text-white">+</span>
            </Button>
          </div>
          <Button
            className={`w-full transition-all duration-200 hover:bg-red-50 hover:border-none hover:shadow-md ${isLoading && "!bg-black"}`}
            variant={"outline"}
            onClick={async () => {
              if (!userInfo?._id) {
                toast({
                  title: "Please log in",
                  description:
                    "You need to be logged in to add items to the wishlist.",
                  variant: "destructive",
                  action: (
                    <ToastAction altText="Try again">
                      <Button
                        onClick={() => handleLoginRedirect()}
                        className="shadow-md hover:shadow-none hover:bg-neutral-700"
                      >
                        Login
                      </Button>
                    </ToastAction>
                  ),
                });
              } else {
                await saveWishlist(
                  userInfo?._id,
                  productData?._id,
                  productColor,
                  productVariant
                );
                setIsSaved(true);
              }
            }}
            disabled={isSaved}
          >
            {isLoading ? (
              <div className="loader w-10 h-10"></div>
            ) : isSaved ? (
              <span className="font-normal">Saved</span>
            ) : (
              <>
                <img src={heartIcon} alt="heart icon" width={18} height={18} />{" "}
                <span className="font-normal">Wishlist</span>
              </>
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
          <p>{selectedVariant?.sku || productData?.sku}</p>
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
