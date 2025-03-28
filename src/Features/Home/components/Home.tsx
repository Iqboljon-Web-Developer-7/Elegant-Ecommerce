import { lazy, Suspense } from "react";
import Products from "@/components/Products/Products";

import Banner from "@/styledComponents/Banner";
import discountImage from "@/assets/discount-add/discount-add.webp";
import StyledLink from "@/styledComponents/StyledLink";

import Features from "./Features";
import InstagramFeed from "../InstagramFeed";
const HomeCarousel = lazy(() => import("./Carousel/Carousel"));
// const HomeCarousel = lazy(() =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve(import("./Carousel/Carousel")), 1000); // 10-second delay
//   })
// );

const ShopCollection = lazy(() => import("./ShopCollection/ShopCollection"));
import SimpleHeading from "./SimpleHeading/SimpleHeading";
import PlaceholderSlide from "./Carousel/Loading";

const Home = () => {
  return (
    <>
      <div className="container-xl">
        <Suspense fallback={<>
          <PlaceholderSlide />
        </>}>
          <HomeCarousel />
        </Suspense>


        <SimpleHeading />
        <ShopCollection />
        <Products />
      </div>
      <div className="container-2xl">
        <Banner img={discountImage}>
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
        </Banner>
      </div>
      <div className="container-xl">
        <Features />
        <InstagramFeed />
      </div>
    </>
  );
};

export default Home;
