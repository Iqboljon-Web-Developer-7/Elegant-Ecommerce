import discountImage from "@/assets/discount-add/discount-add.png";
import { Link } from "react-router-dom";

const BigDiscount = () => {
  return (
    <div className="flex items-center bg-gray-100 gap-[6%]">
      <div className="w-1/2">
        <img
          src={discountImage}
          alt="Person wearing a red winter jacket"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="w-1/2">
        <p className="text-secondary-blue font-bold uppercase inter">
          Sale up to 35% off
        </p>
        <h4 className="text-4xl font-medium text-neutral-700 mt-4">
          Hundreds of <br /> New lower prices!
        </h4>
        <p className="fs-20 text-neutral-700 mt-4 font-normal inter">
          Hurry up!!! Winter is coming!
        </p>
        <Link
          to={"/"}
          className="inline-block mt-6 rounded-lg text-lg transition duration-300"
        >
          Shop Now →
        </Link>
      </div>
    </div>
  );
};

export default BigDiscount;
