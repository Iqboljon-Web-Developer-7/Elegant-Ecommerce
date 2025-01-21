import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

import Zoom from "react-medium-image-zoom";
import loadingImg from "@/assets/loading.svg";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage, ProductVariantType } from "@/lib/types";
import { urlFor } from "@/utils/Client";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface ProductCarouselType {
  images: ProductImage[];
  createdAt?: string;
  selectedVariant: ProductVariantType;
}

const Carousel: FC<ProductCarouselType> = ({
  images,
  createdAt,
  selectedVariant,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef<any>();

  const isNew = () => {
    const CreatedAt = new Date(createdAt!);
    const now = new Date();
    const diffInMonths =
      (now.getFullYear() - CreatedAt.getFullYear()) * 12 +
      now.getMonth() -
      CreatedAt.getMonth();
    return diffInMonths < 2;
  };
  const discount = () =>
    selectedVariant
      ? Math.round(
          ((selectedVariant.price - selectedVariant.salePrice) /
            selectedVariant.price) *
            100
        )
      : null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (mainSwiperRef.current) {
        const swiper = mainSwiperRef.current.swiper;
        if (event.key === "ArrowLeft") {
          swiper.slidePrev();
        } else if (event.key === "ArrowRight") {
          swiper.slideNext();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const allImages = images?.flatMap((item) =>
    item?.images?.flatMap((imageSet) => imageSet.image)
  );

  return (
    <div className="w-full h-full relative">
      <div className="product__main--status absolute left-4 top-4 flex flex-col gap-2 text-base text-center z-10">
        {isNew() && (
          <p className="px-3 rounded-md bg-white font-semibold shadow-md">
            NEW
          </p>
        )}
        {discount !== null && discount()! > 0 && (
          <p className="px-3 rounded-sm bg-secondary-green text-white font-medium shadow-md">
            {`-${discount()}%`}
          </p>
        )}
      </div>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperMain"
        ref={mainSwiperRef}
      >
        {allImages?.length ? (
          allImages?.map((image, idx) => (
            <SwiperSlide key={idx}>
              <Zoom zoomMargin={20}>
                <img
                  width={2000}
                  height={2000}
                  src={urlFor(image?.asset?._ref).toString()}
                  loading="lazy"
                  alt={`Image ${idx + 1}`}
                />
              </Zoom>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              width={2000}
              height={2000}
              src={loadingImg}
              alt="placeholder image"
              className="animate-pulse"
            />
          </SwiperSlide>
        )}
        <div className="custom-prev cursor-pointer shadow-md absolute w-11 h-11 rounded-full items-center justify-center left-8 top-[50%] translate-y-[-50%] bg-white group hidden md:flex z-10">
          <GoArrowLeft className="group-disabled:opacity-60" size={26} />
        </div>
        <div className="custom-next cursor-pointer shadow-md absolute w-11 h-11 rounded-full items-center justify-center right-8 top-[50%] translate-y-[-50%] bg-white group hidden md:flex z-10">
          <GoArrowRight className="group-disabled:opacity-60" size={26} />
        </div>
      </Swiper>

      <Swiper
        // @ts-ignore
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperThumbs"
      >
        {allImages?.length ? (
          allImages.map((image, idx) => (
            <SwiperSlide key={idx}>
              <img
                loading="lazy"
                width={140}
                height={140}
                src={urlFor(image.asset?._ref).toString()}
                alt={`Thumbnail ${idx + 1}`}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              width={140}
              height={140}
              src={loadingImg}
              alt="placeholder image"
              className="animate-pulse"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Carousel;
