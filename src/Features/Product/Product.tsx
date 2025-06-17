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
import { Helmet } from "react-helmet-async";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/utils/Client";

const builder = imageUrlBuilder(client);
const urlFor = (source: string) => builder.image(source).url();

const Product: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { data: productData, isError } = useProduct(id);

  const { variants, title, images, _createdAt, description } = productData || {};

  const { color: productColor, variant: productVariant, quantity: productQuantity } =
    Object.fromEntries(searchParams);

  useEffect(() => {
    if (!productData) return;
    const firstAvailableVariant = productData?.variants?.find((variant) =>
      productData.colors.some((color) => color.name === variant.color && variant.stock > 0)
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
    window.scrollTo(0, 0);
  }, [productData, setSearchParams]);

  const selectedVariant = variants?.find((variant) => variant.title === productVariant);
  if (selectedVariant && +productQuantity > selectedVariant.stock) {
    setSearchParams(
      {
        quantity: selectedVariant.stock.toString(),
      },
      { replace: true }
    );
  }

  const allImages = (() => {
    let count = 0;
    let array: { src: string; color: string }[] = [];
    while ((images?.length ?? 0) > count) {
      images?.[count]?.images?.forEach((item) => {
        array.push({ src: item?.image?.asset?._ref, color: images?.[count]?.color });
      });
      count++;
    }
    return array;
  })();
  const filteredImages = selectedVariant?.color
    ? allImages.filter((img) => img.color === selectedVariant.color)
    : allImages;

  // if (isLoading) {
  //   return (
  //     <>
  //       <Helmet>
  //         <title>Loading Product...</title>
  //         <meta name="description" content="Loading product details..." />
  //         <meta property="og:title" content="Loading Product..." />
  //         <meta property="og:description" content="Loading product details..." />
  //         <meta property="og:type" content="product" />
  //         <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
  //         <meta name="twitter:card" content="summary_large_image" />
  //         <meta name="twitter:title" content="Loading Product..." />
  //         <meta name="twitter:description" content="Loading product details..." />
  //       </Helmet>
  //       <div>Loading...</div>
  //     </>
  //   );
  // }

  if (isError) {
    toast({
      description: "Failed to fetch product data.",
      variant: "destructive",
    });
    return <div className="py-20 text-center text-lg text-red-500">Failed to load product.</div>;
  }

    // if (!productData) {
    //   return null;
    // }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description.slice(0, 80)} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description.slice(0, 80)} />}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
        {filteredImages?.[0]?.src && (
          <meta property="og:image" content={urlFor(filteredImages[0].src)} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {description && <meta name="twitter:description" content={description.slice(0, 80)} />}
        {filteredImages?.[0]?.src && (
          <meta name="twitter:image" content={urlFor(filteredImages[0].src)} />
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