import React, { lazy, Suspense } from "react";
import Banner from "@/components/atoms/Banner";
import discountImage from "@/assets/discount-add/discount-add.webp";
import StyledLink from "@/components/atoms/StyledLink";

import HomeCarousel from "./_components/Carousel/Carousel";
import SimpleHeading from "./_components/SimpleHeading/SimpleHeading";
import ProductLoading from "./_components/Products/ProductLoading";
import SkeletonLoader from "./_components/ShopCollection/SkeletonLoader";

const ShopCollection = lazy(
  () => import("./_components/ShopCollection/ShopCollection")
);
const Products = lazy(() => import("./_components/Products/Products"));
const Features = lazy(() => import("./_components/Features"));
const InstagramFeed = lazy(() => import("./_components/InstagramFeed"));

const Home = React.memo(() => {
  return (
    <>
      <div className="container-xl">
        <HomeCarousel />
        <SimpleHeading />
        <Suspense
          fallback={
            <>
              <div className="min-h-[44rem] grid sm:grid-cols-2 gap-6 mt-12">
                <SkeletonLoader count={3} />
              </div>
            </>
          }
        >
          <ShopCollection />
        </Suspense>
        <Suspense fallback={<ProductLoading />}>
          <Products />
        </Suspense>
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
        <Suspense fallback={<div>Loading Features...</div>}>
          <Features />
        </Suspense>
        <Suspense fallback={<div>Loading Instagram Feed...</div>}>
          <InstagramFeed />
        </Suspense>
      </div>
    </>
  );
});

export default Home;
