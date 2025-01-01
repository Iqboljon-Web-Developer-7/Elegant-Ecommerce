// import EmblaCarousel from "@/components/Home/Carousel/Carousel";
import SimpleHeading from "@/components/Home/SimpleHeading/SimpleHeading";
import ShopCollection from "@/components/Home/ShopCollection/ShopCollection";
import Products from "@/components/Products/Products";
import BigDiscount from "@/components/Home/BigDiscount/BigDiscount";
import Features from "@/components/Home/Features/Features";
import InstagramFeed from "@/components/Home/InstagramFeed/InstagramFeed";

const Home = () => {
  return (
    <>
      <div className="container-xl">
        {/* <EmblaCarousel /> */}
        <SimpleHeading />
        <ShopCollection />
        <Products />
      </div>
      <div className="container-2xl">
        <BigDiscount />
      </div>
      <div className="container-xl">
        <Features />
        <InstagramFeed />
      </div>
    </>
  );
};

export default Home;
