import React, { useState, useEffect, useCallback, useMemo } from "react";
import { urlFor, client } from "@/utils/Client";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  SANITY_IS_PRODUCT_IN_WISHLIST,
  SANITY_USER_WISHLIST,
} from "@/utils/Data";
import { ProductType } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

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

  const [hoveredImageIndex, setHoveredImageIndex] = useState<
    Record<number, number>
  >({});
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handler to update the hovered image based on mouse position.
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

  // Utility to get the current image URL.
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

  // Memoized flag indicating if the product is "new".
  const isNewProduct = useMemo(() => {
    const createdAt = new Date(product._createdAt);
    const now = new Date();
    const diffInMonths =
      (now.getFullYear() - createdAt.getFullYear()) * 12 +
      now.getMonth() -
      createdAt.getMonth();
    return diffInMonths < 2;
  }, [product._createdAt]);

  // Memoized discount percentage.
  const discountPercentage = useMemo(() => {
    const price = product.variants[0].price;
    const salePrice = product.variants[0].salePrice;
    return Math.round(((price - salePrice) / price) * 100);
  }, [product.variants]);

  // Navigate to product details if the click is not on wishlist or add-to-cart buttons.
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

      // for Optimistic updating
      const previousSavedState = isSaved;
      setIsSaved(!previousSavedState);

      setIsLoading(true);

      try {
        const wishlist: Wishlist = await client.fetch(
          SANITY_USER_WISHLIST(userInfo._id)
        );

        if (previousSavedState) {
          // Optimistically removed product from wishlist.
          if (wishlist) {
            const filteredItems = wishlist.items.filter(
              (item) => item.product._ref !== product._id
            );
            await client
              .patch(wishlist._id)
              .set({ items: filteredItems })
              .commit();
          }
        } else {
          // Optimistically added product to wishlist.
          if (!wishlist) {
            await client.create({
              _type: "wishlist",
              userId: userInfo._id,
              name: `${userInfo.username}'s Wishlist`,
              items: [
                {
                  _key: uuidv4(),
                  product: { _type: "reference", _ref: product._id },
                },
              ],
            });
          } else {
            // no need for now
            const duplicate = wishlist.items.some(
              (item) => item.product._ref === product._id
            );
            if (!duplicate) {
              await client
                .patch(wishlist._id)
                .setIfMissing({ items: [] })
                .append("items", [
                  {
                    _key: uuidv4(),
                    product: { _type: "reference", _ref: product._id },
                  },
                ])
                .commit();
            }
          }
        }
      } catch (error) {
        console.error("Error toggling wishlist:", error);
        // Rollback the optimistic update if the API call fails.
        toast({
          title: "Error",
          description: "Failed to update wishlist. Please try again.",
          variant: "destructive",
        });
        setIsSaved(previousSavedState);
      } finally {
        setIsLoading(false);
      }
    },
    [userInfo, isSaved, product, navigate]
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
    const checkWishlist = async () => {
      if (userInfo && product) {
        try {
          const result = await client.fetch(
            SANITY_IS_PRODUCT_IN_WISHLIST(userInfo._id, product._id)
          );
          setIsSaved(!!result);
        } catch (error) {
          console.error("Error checking wishlist:", error);
        }
      }
    };

    checkWishlist();
  }, []);

  return (
    <div
      // ref={wishlistRef}
      onClick={(e) => handleOpenProduct(e, product._id)}
      className="product-container flex flex-col gap-3 cursor-pointer"
    >
      <div
        className="product__main w-full h-full relative group flex-grow bg-red-500"
        onMouseMove={(e) =>
          handleMouseMove(
            e,
            product._id,
            product.images[0].images.slice(0, 5).length
          )
        }
      >
        <div className="min-h-80 bg-neutral-50 flex items-center justify-center overflow-hidden">
          <img
            loading="lazy"
            src={getImageUrl(product, hoveredImageIndex[product._id] || 0)}
            alt={product.title}
            className="object-contain w-full h-full transition-transform duration-300 px-2"
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
            className={`addWishlist p-[.35rem] bg-white rounded-full opacity-0 group-hover:opacity-100 duration-500 shadow-md ${isLoading && "animate-pulse"}`}
          >
            {isSaved ? (
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
          className="addCart absolute right-4 bottom-4 left-4 font-medium text-base opacity-0 group-hover:!opacity-100 transition-all"
        >
          Add to cart
        </Button>

        <div className="px-2 absolute bottom-1 left-0 right-0 flex gap-2">
          {product.images[0].images.slice(0, 5).map((_, index) => (
            <div
              key={index}
              className={`w-full h-[.1rem] rounded-full ${
                index === (hoveredImageIndex[product._id] || 0)
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
