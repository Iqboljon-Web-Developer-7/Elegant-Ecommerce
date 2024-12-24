import EmblaCarousel from "@/components/Home/Carousel/Carousel";
import SimpleHeading from "@/components/Home/SimpleHeading/SimpleHeading";
import ShopCollection from "@/components/Home/ShopCollection/ShopCollection";
import Products from "@/components/Products/Products";
import BigDiscount from "@/components/Home/BigDiscount/BigDiscount";

const Home = () => {
  return (
    <>
      <EmblaCarousel />
      <SimpleHeading />
      <ShopCollection />
      <Products />
      <BigDiscount />
    </>
  );
};

export default Home;
