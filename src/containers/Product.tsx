import Carousel from "@/components/Product/Carousel/Carousel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProductType } from "@/lib/types";
import { client, urlFor } from "@/utils/Client";
import { SANITY_PRODUCT_QUERY } from "@/utils/Data";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import heartIcon from "@/assets/icons/heart.svg";

const Product = () => {
  const [productData, setProductData] = useState<ProductType>();
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const productColor = searchParams.get("color");

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProduct(id: string) {
      await client
        .fetch(SANITY_PRODUCT_QUERY(id))
        .then((data) => setProductData(data[0]))
        .catch((error) => {
          console.error(error);
          toast({ description: error.message, variant: "destructive" });
        });
    }

    fetchProduct(id!);
  }, []);

  let Variants = productData?.variants?.map((item) => (
    <p className="py-1 px-2 border rounded-lg">{item.title}</p>
  ));

  const Colors = productData?.colors?.map((item, index) => {
    let img: string = "";
    productData?.images?.map((image) => {
      if (image.color == item.name) {
        img = image.images[0].image.asset._ref;
      }
    });

    return (
      <div key={index} className="flex flex-wrap gap-4 p-2">
        <img
          src={urlFor(img!).toString()}
          alt="product img"
          width={62}
          height={62}
          className={`border ${item.name == productColor ? "border-black" : "border-transparent"} hover:p-[.1rem] duration-200 cursor-pointer`}
          onClick={() =>
            navigate(`/products/${productData._id}?color=${item.name}`)
          }
        />
      </div>
    );
  });

  return (
    <div className="container-xl">
      <div className="breadcrumb mt-4 text-sm inter">
        <span className="text-slate-600">
          Home {">"} &nbsp; <Link to={"/products"}>Products</Link>{" "}
        </span>{" "}
        {">"}
        &nbsp; {productData?.title.slice(0, 20)}
      </div>

      <div className="main-info grid grid-cols-2 gap-[6%] pt-4">
        <Carousel images={productData?.images!} />
        <div className="singleProduct__top--texts flex-grow self-stretch flex flex-col gap-4">
          <h4 className="text-neutral-700">{productData?.title}</h4>
          <p className="text-neutral-400 text-sm lg:text-base inter">
            {productData?.description}
          </p>
          <div className="flex items-center gap-3">
            <h6>${productData?.salePrice} </h6>
            <span className="fs-20 line-through text-neutral-400">
              ${productData?.price}
            </span>
          </div>
          <hr />
          <div className="additionalInfo flex text-sm">{Variants}</div>
          <div className="colors flex flex-col">
            <p className="text-sm text-neutral-400">Choose Color {">"}</p>
            <p className="mt-2 capitalize">{productColor}</p>
            <div className="flex mt-4">{Colors}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {/* {product?.colors.map(
                (clr: { name: string; color: string }, inx: number) => {
                  return (
                    <div
                      key={inx}
                      onClick={() => changeColor(clr.name)}
                      className="min-w-10 min-h-10 rounded-full border shadow-md cursor-pointer hover:shadow-none duration-200"
                      style={{ backgroundColor: clr.color }}
                    ></div>
                  );
                }
              )} */}
            </div>
          </div>
          <div className="user-collections flex flex-col gap-4">
            <div className="flex items-center justify-center gap-6">
              <div className="counter flex items-center justify-center bg-neutral-200 rounded-lg inter">
                <Button className="bg-transparent shadow-none text-black group">
                  <span className="group-hover:text-white">-</span>
                </Button>
                <span className="px-3">0</span>
                <Button className="bg-transparent shadow-none text-black group">
                  <span className="group-hover:text-white">+</span>
                </Button>
              </div>
              <Button
                className="w-full hover:invert duration-200 transition-all"
                variant={"outline"}
              >
                <img src={heartIcon} alt="heart icon" width={18} height={18} />{" "}
                <span className="font-normal">Add to Cart</span>
              </Button>
            </div>
            <Button className="w-full hover:bg-secondary-green duration-200">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
