import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselItem from "./Carousel/CarouselItem";
import { Scrollbar } from "swiper/modules";

import StyledLink from "@/styledComponents/StyledLink";
import { ProductType } from "@/lib/types";

import "swiper/css";
import "swiper/css/scrollbar";

const Products: FC<{ products: ProductType[] }> = ({ products }) => {
  const SkeletonLoader = () => (
    <div className="mb-16 pt-1 flex items-center gap-6 overflow-x-auto">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="min-w-72 flex flex-col flex-grow animate-pulse items-start bg-white p-3 rounded-lg shadow-md flex-shrink-0"
        >
          <div className="w-full h-64 bg-gray-200 rounded-md"></div>
          <div className="w-12 h-6 bg-gray-200 mt-3 rounded"></div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="w-3/4 h-6 bg-gray-200 mt-3 rounded"></div>
          <div className="w-1/2 h-5 bg-gray-200 mt-2 rounded"></div>
        </div>
      ))}
    </div>
  );

  const SwiperContents = products?.map((product) => (
    <SwiperSlide key={product._id} className="pb-14">
      <CarouselItem product={product} />
    </SwiperSlide>
  ));

  return (
    <div className="products mb-6">
      <>
        <div className="products__info my-12 flex items-end justify-between">
          <h3 className="w-[3ch] text-[2.5rem] leading-[2.75rem] font-medium">
            New Arrival
          </h3>
          <StyledLink destination={"/products"} name="More Products" />
        </div>
        <Swiper
          spaceBetween={8}
          slidesPerView={1.3}
          breakpoints={{
            440: { slidesPerView: 2, spaceBetween: 8 },
            640: { slidesPerView: 3, spaceBetween: 10 },
            800: { slidesPerView: 4, spaceBetween: 14 },
            1024: { slidesPerView: 4.5, spaceBetween: 24 },
          }}
          scrollbar={{ hide: true }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          {SwiperContents}
          {products?.length <= 0 && <SkeletonLoader />}
        </Swiper>
      </>
    </div>
  );
};

export default Products;
