import { useEffect, FC } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ProductData from "./_components/ProductData";
import Carousel from "./_components/Carousel/Carousel";

import { useProduct } from "./hooks/useProduct";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Helmet } from "react-helmet-async";
import { urlFor } from "@/utils/Client";
import { useToast } from "@/hooks/use-toast";

const Product: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: productData, isError } = useProduct(id);

  const { variants, title, images, _createdAt, description } = productData || {};

  const { color: selectedParamColor, variant: selectedParamVariant, quantity: selectedParamQuantity } =
    Object.fromEntries(searchParams);

  const selectedVariant = variants?.find((variant) => variant.title === selectedParamVariant);

  const allImages = images?.flatMap((variation) =>
    variation.images?.map((item) => ({
      src: item?.src,
      color: variation.color,
    })) ?? []
  ) ?? [];

  const filteredImages = allImages?.filter((img) => img.color === selectedVariant?.color)

  // if input value (30) is more than new selected product quantity (20) input value is set to product quantity(20)
  if (selectedVariant && +selectedParamQuantity > selectedVariant.stock) {
    setSearchParams({
      "quantity": selectedVariant.stock.toString(),
    },
      { replace: true }
    )
  }

  useEffect(() => {
    const { color, title } = variants?.find((variant) => variant.stock > 0) || {}

    if (color && title) {
      setSearchParams(
        {
          color,
          variant: title,
          quantity: "1",
        },
        { replace: true }
      );
    }
  }, [productData]);

  if (isError) {
    toast({
      description: "Failed to fetch product data.",
      variant: "destructive",
    });
    return <div className="py-20 text-center text-lg text-red-500">Failed to load product.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {<meta name="description" content={description?.slice(0, 80)} />}
        <meta property="og:title" content={title} />
        {<meta property="og:description" content={description?.slice(0, 80)} />}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
        {(
          filteredImages.length &&
          <meta property="og:image" content={urlFor(filteredImages[0]?.src).url()} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {<meta name="twitter:description" content={description?.slice(0, 80)} />}
        {(
          filteredImages.length &&
          <meta name="twitter:image" content={urlFor(filteredImages[0]?.src).url()} />
        )}
      </Helmet>
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
          <Carousel createdAt={_createdAt} selectedVariant={selectedVariant!} filteredImages={filteredImages} />
          <ProductData
            productData={productData}
            selectedParamColor={selectedParamColor}
            selectedParamVariant={selectedParamVariant}
            selectedParamQuantity={+selectedParamQuantity}
            selectedVariant={selectedVariant!}
          />
        </div>
      </div>
    </>
  );
};

export default Product;