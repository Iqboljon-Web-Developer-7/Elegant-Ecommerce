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
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { data: productData, isError } = useProduct(id);

  const { variants, title, images, _createdAt, description } = productData || {};

  const { color: productColor, variant: productVariant, quantity: productQuantity } =
    Object.fromEntries(searchParams);

  const selectedVariant = variants?.find((variant) => variant.title === productVariant);

  if (selectedVariant && +productQuantity > selectedVariant.stock) {
    setSearchParams({
      "quantity": selectedVariant.stock.toString(),
    },
      { replace: true }
    )
  }

  const allImages = images?.flatMap((variation) =>
    variation.images?.map((item) => ({
      src: item?.src,
      color: variation.color,
    })) ?? []
  ) ?? [];

  const filteredImages = selectedVariant?.color
    ? allImages.filter((img) => img.color === selectedVariant.color)
    : allImages;

  if (isError) {
    toast({
      description: "Failed to fetch product data.",
      variant: "destructive",
    });
    return <div className="py-20 text-center text-lg text-red-500">Failed to load product.</div>;
  }

  useEffect(() => {
    if (!productData) return;

    const firstAvailableVariant = productData?.variants?.find((variant) =>
      productData.colors.some((color) => color.name === variant.color && variant.stock > 0)
    );

    const { color, title } = firstAvailableVariant!

    if (firstAvailableVariant) {
      setSearchParams(
        {
          color,
          variant: title,
          quantity: "1",
        },
        { replace: true }
      );
    }
  }, []);

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
            productColor={productColor}
            productData={productData}
            productQuantity={+productQuantity}
            productVariant={productVariant}
            selectedVariant={selectedVariant!}
          />
        </div>
      </div>
    </>
  );
};

export default Product;