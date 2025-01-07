import Carousel from "@/components/Product/Carousel/Carousel";
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

const Product = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [productData, setProductData] = useState<ProductType>();
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
          <div className="flex items-center gap-3">
            <div className="flex-center justify-start gap-1 text-sm text-slate-800">
              {/* {countStars(
                product?.reviews.comments.reduce(
                  (prev: number, current: { rating: number }) =>
                    (prev += current.rating),
                  0
                ) / product?.reviews.comments.length
              )} */}
            </div>
            <span className="reviews text-sm">
              {/* {product?.reviews.comments.length} reviews */}
            </span>
          </div>
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
          {/* <div className="additionalInfo">{additionalInfo}</div> */}
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
        </div>
      </div>
    </div>
  );
};

export default Product;
