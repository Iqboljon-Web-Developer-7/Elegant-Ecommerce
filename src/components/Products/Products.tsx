import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { useEffect, useState } from "react";
import { client } from "@/utils/Client";
import { SANITY_PRODUCTS_QUERY } from "@/utils/Data";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselItem from "./Carousel/CarouselItem";
import { Product } from "@/lib/types";
import { Scrollbar } from "swiper/modules";
import NoInternet from "../noInternet";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState("");

  useEffect(() => {
    client
      .fetch(SANITY_PRODUCTS_QUERY(0, 20))
      .then((res) => setProducts(res))
      .catch((error) => setProductsError(error.message));
  }, []);

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col animate-pulse items-start bg-white p-4 rounded-lg shadow-md"
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

  const SwiperContents = products.map((product) => (
    <SwiperSlide key={product._id} className="pb-14">
      <CarouselItem product={product} />
    </SwiperSlide>
  ));

  if (products.length <= 0 && !productsError) {
    return (
      <div className="products mb-6">
        <div className="products__info my-12 flex items-end justify-between">
          <h3 className="w-[3ch] text-[2.5rem] leading-[2.75rem] font-medium">
            New Arrival
          </h3>
          <Link
            to={"/products"}
            className="text-base flex items-center justify-center gap-2 border-b border-b-neutral-900"
          >
            More Products <GoArrowRight />
          </Link>
        </div>
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="products mb-6">
      <div className="products__info my-12 flex items-end justify-between">
        <h3 className="w-[3ch] text-[2.5rem] leading-[2.75rem] font-medium">
          New Arrival
        </h3>
        <Link
          to={"/products"}
          className="text-base flex items-center justify-center gap-2 border-b border-b-neutral-900"
        >
          More Products <GoArrowRight />
        </Link>
      </div>
      {productsError && <NoInternet />}
      {!productsError && (
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
      )}
    </div>
  );
};

export default Products;
