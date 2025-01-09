import { useEffect, useState } from "react";
import Carousel from "@/components/Product/Carousel/Carousel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProductType } from "@/lib/types";
import { client, urlFor } from "@/utils/Client";
import { SANITY_PRODUCT_QUERY } from "@/utils/Data";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import heartIcon from "@/assets/icons/heart.svg";
import InfoLoadingSkeleton from "@/components/Product/InfoLoadingSkeleton";

const Product = () => {
  const [productData, setProductData] = useState<ProductType>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const productColor = searchParams.get("color");
  const productVariant = searchParams.get("variant");
  const productQuantity = searchParams.get("quantity");

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProduct(id: string) {
      await client
        .fetch(SANITY_PRODUCT_QUERY(id))
        .then((data) => {
          if (!productColor && !productVariant && !productQuantity) {
            navigate(
              `?color=${data[0]?.colors[0]?.name}&variant=${data[0].variants[0]?.title}&quantity=1`
            );
          }
          setProductData(data[0]);
        })
        .catch((error) => {
          console.error(error);
          toast({ description: error.message, variant: "destructive" });
        });
    }

    fetchProduct(id!);
  }, []);

  const changeParam = (param: string, value: string | number) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(param, value.toString());
    setSearchParams(updatedParams);
  };

  let Variants = productData?.variants?.map((item) => (
    <p
      onClick={() => changeParam("variant", item.title)}
      key={item?._key}
      className={`py-1 px-2 border rounded-lg text-sm lg:text-base cursor-pointer ${
        item.title == productVariant ? "border-black" : "border-gray-300"
      } hover:border-black transition`}
    >
      {item.title}
    </p>
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
          src={img && urlFor(img!).toString()}
          alt="product img"
          width={64}
          height={64}
          className={`w-16 h-16 border ${
            item.name == productColor ? "border-black" : "border-transparent"
          } hover:p-[.1rem] duration-200 cursor-pointer`}
          onClick={() => changeParam("color", item.name)}
        />
      </div>
    );
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="breadcrumb mt-4 text-sm inter">
        <span className="text-slate-600">
          Home {">"} &nbsp; <Link to={"/products"}>Products</Link>{" "}
        </span>{" "}
        {">"}
        &nbsp; {productData?.title.slice(0, 20)}
      </div>

      <div className="main-info grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pt-4 mb-10">
        <Carousel images={productData?.images!} />
        {productData ? (
          <div className="singleProduct__top--texts flex-grow self-stretch flex flex-col gap-6">
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
            {/* Variants */}
            <div className="additionalInfo flex flex-wrap gap-2">
              {Variants}
            </div>
            {/* Colors */}
            <div className="colors flex flex-col mt-2">
              <p className="text-sm text-neutral-400">Choose Color {">"}</p>
              <p className="mt-2 capitalize">{productColor}</p>
              <div className="flex mt-4 gap-2">{Colors}</div>
            </div>
            {/* User Collections */}
            <div className="user-collections flex flex-col gap-4 mt-4">
              <div className="flex items-center justify-between gap-6">
                {/* Quantity Counter */}
                <div className="counter flex items-center justify-center bg-neutral-200 rounded-lg">
                  <Button
                    onClick={() => {
                      if (+productQuantity! > 1)
                        changeParam("quantity", +productQuantity! - 1);
                    }}
                    className="bg-transparent shadow-none text-black group"
                  >
                    <span className="group-hover:text-white">-</span>
                  </Button>
                  <span className="px-3">{productQuantity}</span>
                  <Button
                    onClick={() =>
                      changeParam("quantity", +productQuantity! + 1)
                    }
                    className="bg-transparent shadow-none text-black group"
                  >
                    <span className="group-hover:text-white">+</span>
                  </Button>
                </div>
                {/* Wishlist Button */}
                <Button
                  className="w-full hover:invert duration-200"
                  variant={"outline"}
                >
                  <img
                    src={heartIcon}
                    alt="heart icon"
                    width={18}
                    height={18}
                  />{" "}
                  <span className="font-normal">Wishlist</span>
                </Button>
              </div>
              <Button className="w-full hover:bg-secondary-green duration-200">
                Add to Cart
              </Button>
            </div>
            {/* Additional Info */}
            <div className="border-t pt-6 mt-2 inter text-xs flex flex-col gap-2">
              <div className="flex">
                <p className="text-neutral-400 min-w-32">SKU</p>
                <p>{productData?.sku}</p>
              </div>
              <div className="flex">
                <p className="text-neutral-400 min-w-32">CATEGORY</p>
                <p>
                  {productData?.categories?.map((item, index) => (
                    <span key={item._key}>
                      {item.title}
                      {productData?.categories?.length > index + 1 && ","}{" "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <InfoLoadingSkeleton />
        )}
      </div>
    </div>
  );
};

export default Product;
