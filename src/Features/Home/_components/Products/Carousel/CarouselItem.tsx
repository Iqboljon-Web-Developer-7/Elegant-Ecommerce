import React, { useState, useCallback, useMemo, useEffect } from "react";
import { urlFor } from "@/utils/Client";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/lib/types";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useProductInWishlist } from "@/Features/Home/hook/Products/use-product-in-wishlist";
import { useWishlistActions } from "@/Features/Home/hook/Products/use-wishlist-actions";

export interface WishlistItem {
  _key: string;
  product: {
    _type: string;
    _ref: number;
  };
}

export interface Wishlist {
  _id: string;
  userId: string;
  name: string;
  items: WishlistItem[];
}

const CarouselItem = ({ product }: { product: ProductType }) => {
  const userInfo = useSelector((state: any) => state.PermanentData.userInfo);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [optimisticSaved, setOptimisticSaved] = useState<null | boolean>(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<
    Record<number, number>
  >({});
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(hoveredImageIndex[product._id] || 0);

  const {
    isInWishlist,
    isLoading: wishlistLoading,
    error: wishlistError,
  } = useProductInWishlist(userInfo?._id, product._id);

  console.log(wishlistLoading);
  console.log(wishlistError);

  const { addToWishlist, removeFromWishlist } = useWishlistActions();

  const getImageUrl = useCallback(
    (product: ProductType, index: number): string => {
      const images = product?.images[0]?.images || [];
      const imageRef = images[index]?.image?.asset?._ref;
      return imageRef
        ? urlFor(imageRef).url()
        : "https://placehold.co/260x350?text=Loading...";
    },
    []
  );

  const imgSrc = getImageUrl(product, currentImgIndex);

  const handleMouseMove = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      productId: number,
      imagesLength: number
    ) => {
      if (imagesLength <= 0) return;
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const hoverPosition = e.clientX - left;

      const clampedHoverPosition = Math.max(0, Math.min(hoverPosition, width));
      const hoverPercentage = (clampedHoverPosition / width) * 100;
      const imageIndex = Math.min(
        imagesLength - 1,
        Math.floor((hoverPercentage / 100) * imagesLength)
      );
      setHoveredImageIndex((prev) => ({ ...prev, [productId]: imageIndex }));
    },
    []
  );

  const isNewProduct = useMemo(() => {
    const createdAt = new Date(product._createdAt);
    const now = new Date();
    const diffInMonths =
      (now.getFullYear() - createdAt.getFullYear()) * 12 +
      now.getMonth() -
      createdAt.getMonth();
    return diffInMonths < 2;
  }, [product._createdAt]);

  const discountPercentage = useMemo(() => {
    const price = product.variants[0].price;
    const salePrice = product.variants[0].salePrice;
    return Math.round(((price - salePrice) / price) * 100);
  }, [product.variants]);

  const handleOpenProduct = useCallback(
    (event: React.MouseEvent<HTMLElement>, id: number) => {
      const target = (event.target as HTMLElement).classList;
      if (!target.contains("addWishlist") && !target.contains("addCart")) {
        navigate(`/products/${id}`);
      }
    },
    []
  );

  const handleToggleWishlist = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!userInfo) {
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
        return;
      }
      const previousSavedState =
        optimisticSaved === null ? isInWishlist : optimisticSaved;
      setOptimisticSaved(!previousSavedState);
      try {
        if (previousSavedState) {
          await removeFromWishlist.mutateAsync({
            userId: userInfo._id,
            productId: product._id,
          });
        } else {
          await addToWishlist.mutateAsync({
            userId: userInfo._id,
            productId: product._id,
            username: userInfo.username,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update wishlist. Please try again.",
          variant: "destructive",
        });
        setOptimisticSaved(previousSavedState);
      }
    },
    [userInfo, isInWishlist, optimisticSaved, product, navigate, addToWishlist, removeFromWishlist]
  );

  const handleToggleCart = () => {
    if (!userInfo) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to the cart.",
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
    }
  };

  useEffect(() => {
    setCurrentImgIndex(hoveredImageIndex[product._id] || 0);
    setImgLoaded(false);
  }, [hoveredImageIndex[product._id], product._id]);

  return (
    <div
      onClick={(e) => handleOpenProduct(e, product._id)}
      className="product-container flex flex-col gap-3 cursor-pointer"
    >
      <div
        className="product__main w-full h-full relative group flex-grow"
        onMouseMove={(e) =>
          handleMouseMove(
            e,
            product._id,
            product.images[0].images.slice(0, 5).length
          )
        }
      >

        <div className="min-h-80 bg-white flex items-center justify-center overflow-hidden">
          <img
            loading="lazy"
            src={imgLoaded ? imgSrc : "https://placehold.co/240x100/transparent/222?text=Loading..."}
            alt={product.title}
            className={`object-cover w-full h-full transition-transform duration-300`}
            onError={() => alert("Error loading image")}
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        <div className="absolute left-4 top-4 flex flex-col gap-2 text-base text-center">
          {isNewProduct && (
            <p className="px-3 rounded-md bg-white font-semibold">NEW</p>
          )}
          {discountPercentage > 0 && (
            <p className="px-3 rounded-sm bg-secondary-green text-white font-medium">
              {`-${discountPercentage}%`}
            </p>
          )}
        </div>

        <div className="absolute right-4 top-4">
          <button
            aria-label="addWishlist"
            onClick={handleToggleWishlist}
            className={`addWishlist p-[.35rem] bg-[rgba(255,255,255,0.7)] backdrop-blur-xs rounded-full md:opacity-0 group-hover:opacity-100 duration-500 shadow-md ${addToWishlist.isPending || removeFromWishlist.isPending && "animate-pulse"}`}
          >
            {optimisticSaved === null ? isInWishlist ? (
              <IoMdHeart size={24} className="text-red-500" />
            ) : (
              <IoIosHeartEmpty
                size={24}
                className="fill-neutral-400 hover:fill-black duration-200"
              />
            ) : optimisticSaved ? (
              <IoMdHeart size={24} className="text-red-500" />
            ) : (
              <IoIosHeartEmpty
                size={24}
                className="fill-neutral-400 hover:fill-black duration-200"
              />
            )}
          </button>
        </div>

        <Button
          onClick={handleToggleCart}
          className="addCart bg-[rgba(2,94,115,0.1)] md:bg-black text-black md:text-white hover:text-amber-50 backdrop-blur-sm cursor-pointer  absolute right-4 bottom-4 left-4 font-medium text-base md:opacity-0 group-hover:opacity-100 transition-all"
        >
          Add to cart
        </Button>

        <div className="px-2 absolute bottom-1 left-0 right-0 flex gap-2">
          {product.images[0].images.slice(0, 5).map((_, index) => (
            <div
              key={index}
              className={`w-full h-[.1rem] rounded-full ${index === (hoveredImageIndex[product._id] || 0)
                ? "bg-neutral-900"
                : "bg-neutral-300"
                }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="product__info flex-grow-[2]">
        <div className="stars flex justify-start gap-1 text-neutral-900">
          {new Array(5).fill(0).map((_, index) => (
            <span key={index}>
              <svg width="16" height="16" fill="currentColor">
                <path d="M8 0l2.49 5.03L16 5.83l-4 3.89L12.98 16 8 13.27 3.02 16 4 9.72 0 5.83l5.51-.8L8 0z" />
              </svg>
            </span>
          ))}
        </div>
        <p className="text-black font-semibold leading-8">{product.title}</p>
        <p className="flex gap-2 text-sm">
          <span className="font-semibold text-neutral-700">
            ${product.variants[0].salePrice.toFixed(2)}
          </span>
          {product.variants[0].price && (
            <span className="opacity-75 line-through text-neutral-400">
              ${product.variants[0].price.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default CarouselItem;
