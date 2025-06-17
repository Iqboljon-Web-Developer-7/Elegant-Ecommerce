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
import { Helmet } from "react-helmet";

const Product: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Product id
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // Product data by id
  const { data: productData, isError } = useProduct(id);

  // extracted product data
  const { variants, title, images, _createdAt} = productData || {};

  // params from url
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
    window.scrollTo(0, 0);
  }, [productData]);

  useEffect(() => {
    if (productData) {
      document.title = `${productData.title} | Elegant Ecommerce`;
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content',
        productData.description
      );
      document.querySelector('meta[property="og:image"]')?.setAttribute(
        'content',
        productData.images[0]?.images[0]?.image?.asset?._ref
          ? `https://cdn.sanity.io/images/${import.meta.env.VITE_SANITY_PROJECT_ID}/${productData.images[0].images[0].image.asset._ref
              .split('-')[1]
              .split('.')[0]}.${productData.images[0].images[0].image.asset._ref
              .split('.')[1]}`
          : ''
      );
    }
  }, [productData]);


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

  // Compute allImages and filteredImages here
  const allImages = (() => {
    let count = 0;
    let array: { src: string, color: string }[] = [];
    while ((images?.length ?? 0) > count) {
      images?.[count]?.images?.forEach((item) => {
        array.push({ src: item?.image?.asset?._ref, color: images?.[count]?.color });
      });
      count++;
    }
    return array;
  })();
  const filteredImages = selectedVariant?.color
    ? allImages.filter(img => img.color === selectedVariant.color)
    : allImages;

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
      <title>{title ? `${title} | Elegant Ecommerce11` : '11Elegant Ecommerce'}</title>
      <meta name="description" content={productData?.description || '11Discover a seamless shopping experience with Elegant, blending style and functionality.'} />
      {/* Open Graph */}
      <meta property="og:title" content={title ? `${title} | Elegant Ecommerce11` : '11Elegant Ecommerce'} />
      <meta property="og:description" content={productData?.description || '11Discover a seamless shopping experience with Elegant, blending style and functionality.'} />
      <meta property="og:type" content="product" />
      <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
      <meta property="og:image" content={filteredImages?.[0]?.src
        ? `https://cdn.sanity.io/images/${import.meta.env.VITE_SANITY_PROJECT_ID}/${filteredImages[0].src.split('-')[1].split('.')[0]}.${filteredImages[0].src.split('.')[1]}`
        : 'https://cdn.sanity.io/images/kvpqppgu/production/91d54154e9fea75d229a98d90282acc8a092ea0d-1106x382.jpg'} />
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | Elegant Ecommerce` : '11Elegant Ecommerce'} />
      <meta name="twitter:description" content={productData?.description || '111Shop elegantly with our seamless e-commerce platform.'} />
      <meta name="twitter:image" content={filteredImages?.[0]?.src
        ? `https://cdn.sanity.io/images/${import.meta.env.VITE_SANITY_PROJECT_ID}/${filteredImages[0].src.split('-')[1].split('.')[0]}.${filteredImages[0].src.split('.')[1]}`
        : 'https://cdn.sanity.io/images/kvpqppgu/production/91d54154e9fea75d229a98d90282acc8a092ea0d-1106x382.jpg'} />
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
        <Carousel
          createdAt={_createdAt}
          selectedVariant={selectedVariant!}
          filteredImages={filteredImages}
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
    </>
  );
};

export default Product;
