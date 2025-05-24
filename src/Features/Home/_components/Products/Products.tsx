import { FC, useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselItem from "./Carousel/CarouselItem";
import { Mousewheel, Scrollbar } from "swiper/modules";

import StyledLink from "@/components/atoms/StyledLink";
import { ProductType } from "@/lib/types";

import "swiper/css";
import "swiper/css/scrollbar";
import ProductLoading from "./ProductLoading";
import { client } from "@/utils/Client";
import { SANITY_PRODUCTS_QUERY } from "@/utils/Data";
import { useToast } from "@/hooks/use-toast";

const Products: FC<{ category?: string }> = ({ category }) => {
  console.log(category);
  const { toast } = useToast();
  const [products, setProducts] = useState<ProductType[]>([]);

  const SwiperContents = useMemo(
    () =>
      products?.map((product) => (
        <SwiperSlide key={product._id} className="pb-14">
          <CarouselItem product={product} />
        </SwiperSlide>
      )),
    [products]
  );


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedProducts = await client.fetch(
          SANITY_PRODUCTS_QUERY(0, 20)
        );
        setProducts(fetchedProducts);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast({ description: error?.message, variant: "destructive" });
      }
    };
    fetchInitialData();
  }, []);

  return (
    <div className="products mb-6">
      <div className="products__info my-12 flex items-end justify-between">
        <h5 className="w-[3ch] leading-[2.75rem] font-medium">
          New Arrival
        </h5>
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
        {products?.length <= 0 ? <ProductLoading /> : SwiperContents}
      </Swiper>
    </div>
  );
};

export default Products;
