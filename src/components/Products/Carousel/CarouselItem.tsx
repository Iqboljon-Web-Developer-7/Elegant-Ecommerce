import { Button } from "@/components/ui/button";
import { ProductType } from "@/lib/types";
import { urlFor } from "@/utils/Client";
import React, { useState } from "react";
import { GoHeart } from "react-icons/go";
import { IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CarouselItem = ({ product }: { product: ProductType }) => {
  const navigate = useNavigate();

  // For showing different images of one product when mouse moves above it
  const [hoveredImageIndex, setHoveredImageIndex] = useState<
    Record<number, number>
  >({});

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    productId: number,
    imagesLength: number
  ) => {
    if (imagesLength <= 0) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const hoverPosition = e.clientX - left;
    const hoverPercentage = (hoverPosition / width) * 100;

    const imageIndex = Math.min(
      imagesLength - 1,
      Math.floor((hoverPercentage / 100) * imagesLength)
    );

    setHoveredImageIndex((prev) => ({ ...prev, [productId]: imageIndex }));
  };

  const getImageUrl = (product: ProductType, index: number): string => {
    const images = product?.images[0]?.images || [];
    const imageRef = images[index]?.image?.asset?._ref;

    return imageRef
      ? urlFor(imageRef).url()
      : "https://via.placeholder.com/260x350";
  };
  const isNew = (product: ProductType) => {
    const createdAt = new Date(product._createdAt);
    const now = new Date();
    const diffInMonths =
      (now.getFullYear() - createdAt.getFullYear()) * 12 +
      now.getMonth() -
      createdAt.getMonth();
    return diffInMonths < 2;
  };
  const discount = (product: ProductType) => {
    let price = product.variants[0].price;
    let salePrice = product.variants[0].salePrice;

    return Math.round(((price - salePrice) / price) * 100);
  };

  const handleOpenProduct = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    const target = event.target as HTMLDivElement;
    if (
      !target.classList.contains("addWishlist") &&
      !target.classList.contains("addCart")
    ) {
      navigate(`/products/${id}`);
    }
  };

  return (
    <div
      onClick={(e) => handleOpenProduct(e, product._id)}
      className="product-container flex items-start justify-start flex-col gap-3"
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
        <div
          className="min-h-80 bg-neutral-50 flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getImageUrl(
              product,
              hoveredImageIndex[product._id] || 0
            )})`,
            backgroundSize: "80%",
          }}
        ></div>

        <div className="product__main--status absolute left-4 top-4 flex flex-col gap-2 text-base text-center">
          {isNew(product) && (
            <p className="px-3 rounded-md bg-white font-semibold">NEW</p>
          )}
          {discount !== null && discount(product)! > 0 && (
            <p className="px-3 rounded-sm bg-secondary-green text-white font-medium">
              {`-${discount(product)}%`}
            </p>
          )}
        </div>
        <div className="product__main--wishlistBtn absolute right-4 top-4">
          <button
            aria-label="addWishlist"
            className="bg-white rounded-full opacity-0 group-hover:opacity-100 duration-300 shadow-md"
          >
            <GoHeart
              size={34}
              className="addWishlist p-[.35rem] fill-neutral-400 hover:fill-black duration-200"
            />
          </button>
        </div>
        <Button className="addCart absolute right-4 bottom-4 left-4 font-medium text-base opacity-0 group-hover:!opacity-100 transition-all">
          Add to cart
        </Button>
        <div
          className={`px-2 absolute bottom-1 left-0 right-0 transform flex gap-2`}
        >
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
      <div className="product__info w-full h-full flex-grow-[2]">
        <div className="stars w-full flex justify-start gap-1 text-neutral-900">
          {new Array(5).fill(0).map((_, index) => (
            <IoStar key={index} size={16} />
          ))}
        </div>
        <p className="text-black-800 font-semibold leading-8">
          {product.title}
        </p>
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
