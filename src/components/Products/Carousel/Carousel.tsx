import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/scrollbar";

import "./styles.css";
import { ProductsCarouselProps } from "@/lib/types";
import CarouselItem from "./CarouselItem";

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({ products }) => {
  const SwiperContents = products?.map((product) => (
    <SwiperSlide key={product._id} className="pb-14">
      <CarouselItem product={product} />
    </SwiperSlide>
  ));

  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={1.3}
      breakpoints={{
        400: { slidesPerView: 2, spaceBetween: 8 },
        640: { slidesPerView: 3, spaceBetween: 10 },
        768: { slidesPerView: 4, spaceBetween: 14 },
        1024: { slidesPerView: 4.5, spaceBetween: 24 },
      }}
      scrollbar={{ hide: true }}
      modules={[Scrollbar]}
      className="mySwiper"
    >
      {SwiperContents}
    </Swiper>
  );
};

export default ProductsCarousel;
