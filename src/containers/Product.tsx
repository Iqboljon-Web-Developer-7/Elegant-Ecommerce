import { useEffect, useState, useCallback, FC } from "react";
import Carousel from "@/components/Product/Carousel/Carousel";
import { useToast } from "@/hooks/use-toast";
import { ProductType } from "@/lib/types";
import { client } from "@/utils/Client";
import { SANITY_PRODUCT_QUERY } from "@/utils/Data";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ProductData from "@/components/Product/ProductData";

const Product: FC = () => {
  const [productData, setProductData] = useState<ProductType | undefined>(
    undefined
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const productColor = searchParams.get("color");
  const productVariant = searchParams.get("variant");
  const productQuantity = Number(searchParams.get("quantity")) || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProduct(id: string) {
      try {
        const data: ProductType = await client
          .fetch(SANITY_PRODUCT_QUERY(id))
          .catch(() => navigate("/products"));

        if (!productColor || !productVariant) {
          // Find the first available color and variant combination
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
            });
          }
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
  }, [
    id,
    navigate,
    productColor,
    productVariant,
    productQuantity,
    setSearchParams,
    toast,
  ]);

  const changeParam = useCallback(
    (param: string, value: string | number) => {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set(param, value.toString());
      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    const selectedVariant = productData?.variants.find(
      (variant) => variant.title === productVariant
    );
    if (selectedVariant && productQuantity > selectedVariant.stock) {
      changeParam("quantity", selectedVariant.stock);
    }
  }, [productQuantity, productVariant, changeParam, productData]);

  const selectedVariant = productData?.variants.find(
    (variant) => variant.title === productVariant
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="breadcrumb mt-4 text-sm inter">
        <span className="text-slate-600">
          Home {">"} &nbsp; <Link to={"/products"}>Products</Link>{" "}
        </span>{" "}
        {">"} &nbsp; {productData?.title?.slice(0, 20)}
      </div>
      <div className="main-info grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pt-4 mb-10">
        <Carousel
          selectedVariant={selectedVariant!}
          createdAt={productData?._createdAt}
          images={productData?.images!}
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
