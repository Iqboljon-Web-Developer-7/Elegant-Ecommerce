import discountImage from "@/assets/discount-add/discount-add.png";
import StyledLink from "@/styledComponents/StyledLink";

const BigDiscount = () => {
  return (
    <div className="flex items-center bg-gray-100 gap-[6%] flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <img
          src={discountImage}
          alt="Person wearing a red winter jacket"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 ps-3 py-12 sm:p-10 md:p-0">
        <p className="text-base text-secondary-blue font-bold uppercase inter">
          Sale up to 35% off
        </p>
        <h4 className="md:max-w-[16.7rem] lg:max-w-[22.3rem] mt-3 sm:mt-4 md:mt-2 lg:mt-4 text-[2rem] sm:text-[2.5rem] md:text-3xl lg:text-[2.5rem] font-medium text-neutral-700 tracking-normal !leading-8 sm:!leading-7 lg:!leading-10">
          HUNDREDS of New lower prices!
        </h4>
        <p className="text-[1.25rem] md:text-base lg:text-[1.25rem] text-neutral-700 mt-3 sm:mt-4 md:mt-2 lg:mt-6 font-normal inter">
          Hurry up!!! Winter is coming!
        </p>
        <StyledLink
          destination="/products/discount"
          name="Shop Now"
          className="mt-4 lg:mt-6"
        />
      </div>
    </div>
  );
};

export default BigDiscount;
