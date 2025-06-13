import { FC, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselItem from "./Carousel/CarouselItem";
import { Mousewheel, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";

import StyledLink from "@/components/atoms/StyledLink";

import ProductLoading from "./ProductLoading";

import { useInView } from "react-intersection-observer";
import { useProducts } from "@/Features/Home/hook/Products/useProducts";

const Products: FC<{ category?: string }> = ({ category }) => {
  const [mainRef, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  console.log(category);
  const { toast } = useToast();

  const { data: products, isLoading, isError, error } = useProducts(inView)

  if (isError) {
    console.error("Error fetching data:", error);
    toast({ description: error?.message, variant: "destructive" });
  }

  const SwiperContents = useMemo(
    () =>
      products?.map((product) => (
        <SwiperSlide key={product._id} className="pb-14">
          <CarouselItem product={product} />
        </SwiperSlide>
      )),
    [products]
  );

  return (
    <div className="products mb-6" ref={mainRef}>
      <div className="products__info my-12 flex items-end justify-between">
        <h5 className="w-[3ch] leading-[2.75rem] font-medium">New Arrival</h5>
        <StyledLink destination={"/products"} name="More Products" />
      </div>
      <Swiper
        mousewheel={{ forceToAxis: true }}
        spaceBetween={8}
        slidesPerView={1.3}
        breakpoints={{
          440: { slidesPerView: 2, spaceBetween: 8 },
          640: { slidesPerView: 3, spaceBetween: 10 },
          800: { slidesPerView: 4, spaceBetween: 14 },
          1024: { slidesPerView: 4.5, spaceBetween: 24 },
        }}
        scrollbar={{ hide: true }}
        modules={[Scrollbar, Mousewheel]}
        className="mySwiper"
      > 
        {isLoading ? <ProductLoading /> : SwiperContents}
      </Swiper>
    </div>
  );
};

export default Products;
