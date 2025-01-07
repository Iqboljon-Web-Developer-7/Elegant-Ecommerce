import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

import Zoom from "react-medium-image-zoom";
import loadingImg from "@/assets/loading.svg";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "@/lib/types";
import { urlFor } from "@/utils/Client";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

export default function Carousel({ images }: { images: ProductImage[] }) {
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

  // Flatten all images from productData
  const allImages = images?.flatMap((item) =>
    item.images.flatMap((imageSet) => imageSet.image)
  );

  return (
    <div className="w-full h-full">
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
        {allImages?.length > 0 ? (
          allImages.map((image, idx) => (
            <SwiperSlide key={idx}>
              <Zoom zoomMargin={20}>
                <img
                  width={2000}
                  height={2000}
                  src={urlFor(image.asset?._ref).toString()}
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
        {allImages?.length > 0 ? (
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
}
