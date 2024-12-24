import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import ProductsCarousel from "./Carousel/Carousel";
import { useEffect, useState } from "react";
import { client } from "@/utils/Client";
import { SANITY_PRODUCTS_QUERY } from "@/utils/Data";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client.fetch(SANITY_PRODUCTS_QUERY(0, 20)).then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <div className="products mb-12">
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
      <ProductsCarousel products={products} />
    </div>
  );
};

export default Products;
