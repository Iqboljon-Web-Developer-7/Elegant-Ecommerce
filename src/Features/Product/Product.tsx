import { useEffect, FC } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams, useSearchParams } from "react-router-dom";
import ProductData from "./_components/ProductData";
import Carousel from "./_components/Carousel/Carousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useProduct } from "./hooks/useProduct";
// import Loading

const Product: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: productData, isError } = useProduct(id);
  const { variants, title, images, _createdAt } = productData || {};

  const { color: productColor, variant: productVariant, quantity: productQuantity } = Object.fromEntries(searchParams);

  useEffect(() => {
    if (!productData) return;
    const firstAvailableVariant = productData?.variants?.find((variant) =>
      productData.colors.some(
        (color) => color.name === variant.color && variant.stock > 0
      )
    );
    if (firstAvailableVariant) {
      setSearchParams(
        {
          color: firstAvailableVariant.color,
          variant: firstAvailableVariant.title,
          quantity: "1",
        },
        { replace: true }
      );
    }
  }, [productData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const selectedVariant = variants?.find(
    (variant) => variant.title === productVariant
  );
  if (selectedVariant && +productQuantity > selectedVariant.stock) {
    setSearchParams(
      {
        quantity: selectedVariant.stock.toString(),
      },
      { replace: true }
    );
  }

  if (isError) {
    toast({
      description: "Failed to fetch product data.",
      variant: "destructive",
    });
    return <div className="py-20 text-center text-lg text-red-500">Failed to load product.</div>;
  }

  return (
    <div className="container-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="breadcrumb mt-4 inter text-sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title?.slice(0, 20)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="main-info pt-4 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <Carousel
          images={images!}
          createdAt={_createdAt}
          selectedVariant={selectedVariant!}
        />
        <ProductData
          productColor={productColor}
          productData={productData}
          productQuantity={+productQuantity}
          productVariant={productVariant}
          selectedVariant={selectedVariant!}
        />
      </div>
    </div>
  );
};

export default Product;
