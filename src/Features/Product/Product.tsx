import React, { useEffect, FC, useState, useRef } from "react";
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

// Define the review type based on Sanity schema
interface Review {
  rating: number;
  comment: string;
  _key: string;
  postedBy: {
    _ref: string;
  };
}

const Product: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data: productData, isError } = useProduct(id);

  const { variants, title, images, _createdAt, description, reviews } = productData || {};

  const { color: selectedParamColor, variant: selectedParamVariant, quantity: selectedParamQuantity } =
    Object.fromEntries(searchParams);

  const selectedVariant = variants?.find((variant) => variant.title === selectedParamVariant);

  const allImages = images?.flatMap((variation) =>
    variation.images?.map((item) => ({
      src: item?.src,
      color: variation.color,
    })) ?? []
  ) ?? [];

  const filteredImages = allImages?.filter((img) => img.color === selectedVariant?.color);

  // Update local reviews when productData changes
  useEffect(() => {
    if (reviews && Array.isArray(reviews)) {
      setLocalReviews(reviews.slice(0, page * 5)); // Load 5 reviews per page
      setHasMore(reviews.length > page * 5);
    }
  }, [reviews, page]);

  // Quantity validation
  if (selectedVariant && +selectedParamQuantity > selectedVariant.stock) {
    setSearchParams({
      "quantity": selectedVariant.stock.toString(),
    }, { replace: true });
  }

  useEffect(() => {
    const { color, title } = variants?.find((variant) => variant.stock > 0) || {};

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

  // Handle new review submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.comment) {
      toast({ description: "Please fill all fields.", variant: "destructive" });
      return;
    }
    const reviewToAdd: Review = {
      rating: newReview.rating,
      comment: newReview.comment,
      _key: Math.random().toString(36).substr(2, 9),
      postedBy: { _ref: "mockUserRef" }, // Replace with actual user ID
    };
    setLocalReviews([reviewToAdd, ...localReviews]);
    setNewReview({ rating: 0, comment: "" });
    toast({ description: "Review submitted successfully!" });
  };

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    }, { threshold: 1.0 });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

  // Sort reviews by newest (using _key as fallback)
  const sortedReviews = [...localReviews].sort((a, b) => b._key.localeCompare(a._key));

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
        <div className="reviews-section mt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-semibold text-2xl">Customer Reviews</p>
              <div className="flex items-center gap-2 mt-6">
                <span className="text-yellow-400">★★★★☆</span> {/* Placeholder rating */}
                <span className="text-gray-600">{sortedReviews.length} Reviews</span>
                <span className="text-gray-600">Tray Table</span>
              </div>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-full">Write Review</button>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mt-10">
              <h5 className="">{sortedReviews.length} Reviews</h5>
              <div className="flex justify-end">
                <select className="border rounded px-2 py-1" defaultValue="Newest">
                  <option value="Newest">Newest</option>
                </select>
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto pr-2 mt-4">
              {sortedReviews?.map((review, _index) => (
                <div key={review._key} className="pt-4 mt-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex flex-col">
                      <p className="font-semibold">User_{review.postedBy._ref.substring(0, 5)}</p>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                        ))}
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Created at {new Date().toLocaleDateString()}
                      </div>
                      <div className="mt-2 text-sm text-blue-500">
                        <span>Like</span> | <span>Reply</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {hasMore && (
                <div ref={loaderRef} className="h-10 flex items-center justify-center">
                  Loading...
                </div>
              )}
              {!hasMore && sortedReviews.length > 0 && (
                <div className="text-center text-gray-500 py-4">No more reviews</div>
              )}
            </div>
          </div>
          {/* Write Review Form */}
          <div className="mt-8 p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <input type="hidden" value="mockUserRef" /> {/* Replace with actual user ID */}
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                <option value={0}>Select Rating</option>
                {Array.from({ length: 5 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} Stars</option>
                ))}
              </select>
              <textarea
                placeholder="Your Review"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
              <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;