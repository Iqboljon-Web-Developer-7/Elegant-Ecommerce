import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

import Zoom from "react-medium-image-zoom";
import loadingImg from "@/assets/product/loading.svg";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductCarouselType } from "@/lib/types";
import { urlFor } from "@/utils/Client";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Button } from "@/components/ui/button";

const Carousel: FC<ProductCarouselType> = ({
  images,
  createdAt,
  selectedVariant,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef<any>();

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

  const allImages = images?.flatMap((item) =>
    item?.images?.flatMap((imageSet) => imageSet.image)
  );

  return (
    <div className="w-full h-full relative">
      <div className="product__main--status absolute top-4 left-4 flex flex-col gap-2 text-base text-center z-10">
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
        ref={mainSwiperRef}
        className="mySwiperMain"
      >
        {allImages?.length ? (
          allImages?.map((image, idx) => (
            <SwiperSlide key={idx}>
              <Zoom zoomMargin={20}>
                <img
                  className="max-w-[36.5rem] max-h-[36.5rem] mx-auto"
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
        <Button className="carouselBtn custom-prev z-10 left-8 top-[50%] translate-y-[-50%]">
          <GoArrowLeft className="group-disabled:opacity-60 scale-125 !drop-shadow-[10px 10px red] drop-shadow-amber-700" color="#000" size={26}
          />

        </Button>
        <Button className="carouselBtn custom-next z-10 right-8 top-[50%] translate-y-[-50%]">
          <GoArrowRight className="group-disabled:opacity-60 scale-125" color="black" size={26} />
        </Button>
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
