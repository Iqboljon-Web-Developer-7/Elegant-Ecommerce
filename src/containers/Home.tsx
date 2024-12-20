import EmblaCarousel from "@/components/Home/Carousel/Carousel";
import SimpleHeading from "@/components/Home/SimpleHeading/SimpleHeading";
import ShopCollection from "@/components/Home/ShopCollection/ShopCollection";
import Products from "@/components/Products/Products";

const Home = () => {
  return (
    <>
      <EmblaCarousel />
      <SimpleHeading />
      <ShopCollection />
      <Products />
    </>
  );
};

export default Home;
