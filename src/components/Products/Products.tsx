import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import ProductsCarousel from "./Carousel/Carousel";

const Products = () => {
  return (
    <div className="products mb-12">
      <div className="products__info my-12 flex items-end justify-between">
        <h3 className="w-[3ch] text-[2.5rem] leading-[2.75rem] font-medium">
          New Arrival
        </h3>
        <Link
          to={"/products"}
          className="text-base flex items-center justify-center gap-2 border-b border-b-black-800"
        >
          More Products <GoArrowRight />
        </Link>
      </div>
      <ProductsCarousel />
    </div>
  );
};

export default Products;
