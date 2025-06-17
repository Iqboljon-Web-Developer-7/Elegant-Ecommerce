  import React, { lazy, Suspense } from "react";
  import { Helmet } from "react-helmet-async";

  import HomeCarousel from "./_components/Carousel/Carousel"
  import SimpleHeading from "./_components/SimpleHeading/SimpleHeading";
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
  const Banner = lazy(() => import("@/components/molecules/Banner"));
  const StyledLink = lazy(() => import("@/components/atoms/StyledLink"));
  import Features from "./_components/Features";
  import InstagramFeed from "./_components/InstagramFeed";

  import discountImage from "@/assets/discount-add/discount-add.webp";

  const Home = React.memo(() => {
    return (
      <>
        <Helmet>
          <title>Elegant - Stylish E-Commerce Shopping Platform</title>
          <meta name="description" content="Discover a seamless shopping experience with Elegant, blending style and functionality." />
          {/* Open Graph */}
          <meta property="og:title" content="Elegant - Stylish E-Commerce Shopping Platform" />
          <meta property="og:description" content="Discover a seamless shopping experience with Elegant, blending style and functionality." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://elegant-ecommerce-nine.vercel.app" />
          <meta property="og:image" content="https://cdn.sanity.io/images/kvpqppgu/production/91d54154e9fea75d229a98d90282acc8a092ea0d-1106x382.jpg" />
          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Elegant - Stylish E-Commerce Shopping Platform" />
          <meta name="twitter:description" content="Shop elegantly with our seamless e-commerce platform." />
          <meta name="twitter:image" content="https://cdn.sanity.io/images/kvpqppgu/production/91d54154e9fea75d229a98d90282acc8a092ea0d-1106x382.jpg" />
        </Helmet>
        <div className="container-xl">
          <HomeCarousel />
          <SimpleHeading />
          <Suspense
            fallback={
              <SkeletonLoader count={3} />
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
              It's more affordable than ever to give every room in your home a
              stylish makeover
            </p>
            <StyledLink destination="/products/discount" name="Shop Now" />
          </Banner>
        </div>
        <div className="container-xl">
            <Features />
            <InstagramFeed />
        </div>
      </>
    );
  });

  export default Home;
