import { FC, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import heartIcon from "@/assets/icons/heart.svg";
import redHeartIcon from "@/assets/icons/red-heart.svg";
import { ProductDataProps } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ToastAction } from "@radix-ui/react-toast";
import { useSelector } from "react-redux";
import InfoLoadingSkeleton from "./InfoLoadingSkeleton";
import CategoriesComponent from "./Categories/Categories";
import ColorsComponent from "./Colors/Colors";
import VariantsComponent from "./Variants/Variants";
import useWishlist from "./Wishlist/Wishlist";
import useChangeParam from "@/hooks/useChangeParam";

const ProductData: FC<ProductDataProps> = ({
  productData,
  selectedVariant,
  productColor,
  productVariant,
  productQuantity,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.PermanentData.userInfo);
  
  const {changeParam} = useChangeParam()

  // Use custom wishlist hook if user and product data exist
  const { isInWishlist, isLoading, saveWishlist, removeWishlist } = useWishlist(
    userInfo?._id,
    productData?._id!,
    productColor!,
    productVariant!
  );

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
  }, [userInfo]);

  const handleAddWishlist = useCallback(async () => {
    if (!requireLogin()) return;
    await saveWishlist();
  }, [requireLogin, saveWishlist]);

  const handleRemoveWishlist = useCallback(async () => {
    if (!requireLogin()) return;
    await removeWishlist();
  }, [requireLogin, removeWishlist]);

  const Variants = useMemo(() => {
    if (!productData?.variants) return null;
    return (
      <VariantsComponent
        variants={productData.variants}
        selectedVariant={productVariant!}
        changeParam={changeParam}
      />
    );
  }, [productData, productVariant, changeParam]);

  const Colors = useMemo(() => {
    if (!productData?.colors) return null;
    return (
      <ColorsComponent
        colors={productData.colors}
        variants={productData.variants}
        productVariant={productVariant!}
        productColor={productColor!}
        changeParam={changeParam}
        images={productData.images}
      />
    );
  }, [productData, productVariant, productColor, changeParam]);

  const Categories = useMemo(() => {
    if (!productData?.categories) return null;
    return <CategoriesComponent categories={productData.categories} />;
  }, [productData]);

  if (!productData) return <InfoLoadingSkeleton />;

  return (
    <div className="singleProduct__top--texts flex-grow self-stretch flex flex-col gap-6">
      <h4 className="text-neutral-700">{productData.title}</h4>
      <p className="text-neutral-400 inter text-sm lg:text-base">{productData.description}</p>
      <div className="flex items-center gap-3">
        <h6>${selectedVariant?.salePrice}</h6>
        <span className="text-[1.25rem] line-through text-neutral-400">${selectedVariant?.price}</span>
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
                if (productQuantity > 1) changeParam("quantity", productQuantity - 1, true);
              }}
              className="bg-transparent shadow-none text-black group"
            >
              <span className="group-hover:text-white">-</span>
            </Button>
            <span className="px-3">{productQuantity}</span>
            <Button
              onClick={() => {
                if (productQuantity < selectedVariant?.stock) changeParam("quantity", productQuantity + 1, true);
              }}
              className="bg-transparent shadow-none text-black group"
            >
              <span className="group-hover:text-white">+</span>
            </Button>
          </div>
          <Button
            className={`group w-full transition-all duration-200 hover:bg-red-50 hover:border-none hover:shadow-md ${isLoading ? "!bg-black" : ""
              }`}
            variant={"outline"}
          >
            {isLoading ? (
              <div className="loader w-10 h-10"></div>
            ) : isInWishlist ? (
              <div onClick={handleRemoveWishlist} className="font-normal flex-center gap-2 w-full h-full">
                <img src={redHeartIcon} alt="Saved" />
                Saved
              </div>
            ) : (
              <div onClick={handleAddWishlist} className="flex-center gap-2 w-full h-full">
                <img src={heartIcon} alt="Wishlist" width={18} height={18} />
                <span className="font-normal">Wishlist</span>
              </div>
            )}
          </Button>
        </div>
        <Button className="w-full hover:bg-secondary-green duration-200">Add to Cart</Button>
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
