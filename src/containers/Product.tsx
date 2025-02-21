import { useEffect, useState, useCallback, FC } from "react";
import Carousel from "@/components/Product/Carousel/Carousel";
import { useToast } from "@/hooks/use-toast";
import { ProductType } from "@/lib/types";
import { client } from "@/utils/Client";
import { SANITY_PRODUCT_QUERY } from "@/utils/Data";
import {
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ProductData from "@/components/Product/ProductData";

const Product: FC = () => {
  const [productData, setProductData] = useState<ProductType | undefined>(
    undefined
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const productColor = searchParams.get("color");
  const productVariant = searchParams.get("variant");
  const productQuantity = Number(searchParams.get("quantity")) || 1;

  const { variants, title, images, _createdAt } = productData || {};

  const changeParam = useCallback(
    (param: string, value: string | number) => {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set(param, value?.toString());
      setSearchParams(updatedParams, {replace:true})
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProduct(id: string) {
      try {
        const data: ProductType = await client
          .config({ useCdn: false })
          .fetch(SANITY_PRODUCT_QUERY(id))

        const firstAvailableVariant = data.variants.find((variant) =>
          data.colors.some(
            (color) => color.name === variant.color && variant.stock > 0
          )
        );

        if (firstAvailableVariant) {
          setSearchParams({
            color: firstAvailableVariant.color,
            variant: firstAvailableVariant.title,
            quantity: "1",
          }, { replace: true });
        }
        setProductData(data);
      } catch (error) {
        console.error(error);
        toast({
          description: "Failed to fetch product data.",
          variant: "destructive",
        });
      }
    }
    fetchProduct(id!);
  }, []);
  
  const selectedVariant = variants?.find(
    (variant) => variant.title === productVariant
  );
  if (selectedVariant && productQuantity > selectedVariant.stock) {
    changeParam("quantity", selectedVariant.stock);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="breadcrumb mt-4 inter text-sm">
        <span className="text-slate-600">
          Home {">"} &nbsp; <Link to={"/products"}>Products</Link>{" "}
        </span>{" "}
        {">"} &nbsp; {title?.slice(0, 20)}
      </div>
      <div className="main-info pt-4 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <Carousel
          images={images!}
          createdAt={_createdAt}
          selectedVariant={selectedVariant!}
        />
        <ProductData
          changeParam={changeParam}
          productColor={productColor}
          productData={productData}
          productQuantity={productQuantity}
          productVariant={productVariant}
          selectedVariant={selectedVariant!}
        />
      </div>
    </div>
  );
};

export default Product;
