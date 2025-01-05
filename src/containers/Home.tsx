import { useEffect } from "react";
import EmblaCarousel from "@/components/Home/Carousel/Carousel";
import SimpleHeading from "@/components/Home/SimpleHeading/SimpleHeading";
import ShopCollection from "@/components/Home/ShopCollection/ShopCollection";
import Products from "@/components/Products/Products";
import Features from "@/components/Home/Features/Features";
import InstagramFeed from "@/components/Home/InstagramFeed/InstagramFeed";
import discountImage from "@/assets/discount-add/discount-add.webp";
import Banner from "@/styledComponents/Banner";
import StyledLink from "@/styledComponents/StyledLink";

import { client } from "@/utils/Client";
import {
  SANITY_SLIDES_QUERY,
  SANITY_COLLECTIONS_QUERY,
  SANITY_PRODUCTS_QUERY,
} from "@/utils/Data";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/redux/slices/homePageData";
import { ProductType } from "@/lib/types";

const Home = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const slidesData = await client.fetch(SANITY_SLIDES_QUERY);
        dispatch(add({ key: "slides", value: slidesData }));

        const [collectionsData, productsData] = await Promise.all([
          client.fetch(SANITY_COLLECTIONS_QUERY),
          client.fetch(SANITY_PRODUCTS_QUERY(0, 20)),
        ]);

        console.log(productsData);

        dispatch(add({ key: "collections", value: collectionsData }));
        dispatch(add({ key: "products", value: productsData }));
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast({ description: error?.message, variant: "destructive" });
      }
    };

    fetchInitialData();
  }, []);

  const products = useSelector(
    (state: { HomePageData: { products: ProductType[] } }) =>
      state.HomePageData.products
  );

  return (
    <>
      <div className="container-xl">
        <EmblaCarousel />
        <SimpleHeading />
        <ShopCollection />
        {/* Gets products as a prop because Products component used in another place too */}
        <Products products={products} />
      </div>
      <div className="container-2xl">
        {/* Banner component also used differently */}
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
