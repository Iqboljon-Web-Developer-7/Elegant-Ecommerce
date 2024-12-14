import EmblaCarousel from "@/components/Carousel/Carousel";
import Header from "@/components/Header/Header";
import { HeaderSidebar } from "@/components/Header/Sidebar";

import "@/components/Carousel/css/base.css";
import "@/components/Carousel/css/embla.css";
import "@/components/Carousel/css/sandbox.css";
import SimpleHeading from "@/components/SimpleHeading/SimpleHeading";
import ShopCollection from "@/components/ShopCollection/ShopCollection";
import { client } from "@/utils/Client";
import { useEffect, useState } from "react";
import Products from "@/components/Products/Products";

const Home = () => {
  const OPTIONS = {};

  const [SLIDES, setSLIDES] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "carousel"]`).then((data) => setSLIDES(data));
  }, []);

  return (
    <div className="w-full container-xl">
      <Header />
      <HeaderSidebar />
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <SimpleHeading />
      <ShopCollection />
      <Products />
    </div>
  );
};

export default Home;
