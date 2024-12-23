import { Swiper, SwiperSlide } from "swiper/react";
import { GoHeart } from "react-icons/go";
import { IoStar } from "react-icons/io5";

import { Scrollbar } from "swiper/modules";
import { Button } from "@/components/ui/button";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/scrollbar";

import "./styles.css";

const products = [1, 2, 3, 4, 5, 6];

export default function ProductsCarousel() {
  return (
    <>
      <Swiper
        spaceBetween={8}
        slidesPerView={1.3}
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 24,
          },
        }}
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {products?.map((_, index) => (
          <SwiperSlide key={index} className="pb-14">
            <div className="flex items-start justify-start flex-col gap-3">
              <div className="product__main w-full h-full relative group flex-grow">
                <img
                  src="https://picsum.photos/260/350"
                  alt="product_img"
                  className="object-cover h-full w-full max-h-80"
                />
                <div className="product__main--status absolute left-4 top-4 flex flex-col gap-2 font-bold text-base text-center">
                  <p className="px-3 rounded-md bg-white">NEW</p>
                  <p className="px-3 rounded-md bg-secondary-green text-white">
                    -50%
                  </p>
                </div>
                <div className="product__main--wishlishtBtn absolute right-4 top-4">
                  <button className="bg-white p-[.35rem] rounded-full opacity-0 group-hover:opacity-100 duration-300">
                    <GoHeart size={22} />
                  </button>
                </div>
                <Button className="absolute right-4 bottom-4 left-4 font-medium text-base opacity-0 group-hover:!opacity-100 transition-all">
                  Add to cart
                </Button>
              </div>
              <div className="product__info w-full h-full flex-grow-[2]">
                <div className="stars w-full flex justify-start gap-1 text-neutral-900">
                  {new Array(5).fill(5).map((_, index) => (
                    <IoStar key={index} size={16} />
                  ))}
                </div>
                <p className="text-black-800 font-semibold leading-8">
                  Loveseat Sofa
                </p>
                <p className="flex gap-2 text-sm">
                  <span className="font-semibold text-neutral-700">
                    $199.00
                  </span>
                  <span className="opacity-75 line-through text-neutral-400">
                    $400.00
                  </span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
