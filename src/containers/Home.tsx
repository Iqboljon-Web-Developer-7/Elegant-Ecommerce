import { useEffect, useState } from "react";
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

const Home = () => {
  const [data, setData] = useState({
    slides: [],
    collections: [],
    products: [],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const slidesData = await client.fetch(SANITY_SLIDES_QUERY);
        setData((prevData) => ({
          ...prevData,
          slides: slidesData,
        }));

        const [collectionsData, productsData] = await Promise.all([
          client.fetch(SANITY_COLLECTIONS_QUERY),
          client.fetch(SANITY_PRODUCTS_QUERY(0, 20)),
        ]);

        setData((prevData) => ({
          ...prevData,
          collections: collectionsData,
          products: productsData,
        }));
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <>
      <div className="container-xl">
        <EmblaCarousel slides={data?.slides} />
        <SimpleHeading />
        <ShopCollection collections={data.collections} />
        <Products products={data.products} />
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
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default Home;
