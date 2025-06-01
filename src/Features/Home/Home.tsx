import React, { lazy, Suspense } from "react";

const HomeCarousel = lazy(() => import("./_components/Carousel/Carousel"));
const SimpleHeading = lazy(
  () => import("./_components/SimpleHeading/SimpleHeading")
);

const ShopCollection = lazy(
  () => import("./_components/ShopCollection/ShopCollection")
);
const SkeletonLoader = lazy(
  () => import("./_components/ShopCollection/SkeletonLoader")
);

const Products = lazy(() => import("./_components/Products/Products"));
const ProductLoading = lazy(
  () => import("./_components/Products/ProductLoading")
);

const Banner = lazy(() => import("@/components/atoms/Banner"));
import discountImage from "@/assets/discount-add/discount-add.webp";
const StyledLink = lazy(() => import("@/components/atoms/StyledLink"));

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
          <h4 className="max-w-[22.3rem] font-medium">
            HUNDREDS of New lower prices!
          </h4>
          <p className="text-sm sm:text-[1.25rem] md:text-base lg:text-[1.25rem] text-neutral-700 font-normal inter">
            It’s more affordable than ever to give every room in your home a
            stylish makeover
          </p>
          <StyledLink destination="/products/discount" name="Shop Now" />
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
