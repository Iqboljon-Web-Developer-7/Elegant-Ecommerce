import React, { useEffect, FC, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

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

import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

import { client, urlFor } from "@/utils/Client";
import { Button } from "@/components/ui/button";

import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { ToastAction } from "@/components/ui/toast";
import { useProductReviews } from "./hooks/useReviews";

const Product: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const navigate = useNavigate()

  const { toast } = useToast();

  const { data: productData, isError } = useProduct(id);
  const { variants, title, images, _createdAt, description } = productData || {};

  const { data: productReviews } = useProductReviews(id, 0, 4)
  const reviews = productReviews?.pages[0] || []

  const userInfo = useSelector((state: any) => state.PermanentData.userInfo);

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

  const SANITY_CREATE_REVIEW = async (productId: string, review: { rating: number; comment: string }, userId: string) => {
    const reviewDoc = {
      _id: uuidv4(),
      _type: 'review',
      product: { _type: 'reference', _ref: productId },
      postedBy: { _type: 'reference', _ref: userId },
      rating: review?.rating,
      comment: review?.comment,
      createdAt: new Date().toISOString(),
    };

    const createdReview = client.createIfNotExists(reviewDoc)
    return createdReview;
  };

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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = userInfo?._id;

    if (!userId) {
      toast({
        description: "Please sign in to submit a review.", variant: "destructive", action: (
          <ToastAction altText="Try again">
            <Button
              onClick={() => {
                sessionStorage.setItem("returnUrl", window.location.pathname);
                navigate("/auth/login");
              }}
              className="shadow-md hover:shadow-none hover:bg-neutral-700"
            >
              Login
            </Button>
          </ToastAction>
        ),
      });
      return;
    }
    if (!newReview.rating || !newReview.comment) {
      toast({ description: "Please fill all fields.", variant: "destructive" });
      return;
    }

    try {
      await SANITY_CREATE_REVIEW(id!, newReview, userId);
      toast({ description: "Review submitted successfully!" });
      setNewReview({ rating: 0, comment: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);

      toast({ description: "Failed to submit review.", variant: "destructive" });
    }
  };

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
        <div className={`reviews-section mt-12`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[1.75rem] font-semibold">Customer Reviews {reviews?.length}</p>
              <div className={`flex items-center gap-2 mt-2 ${!reviews?.length && 'hidden'}`}>
                <span className="text-yellow-400">★★★★☆</span>
                <span className="text-gray-600">{reviews?.length} Reviews</span>
                <span className="text-gray-600 font-semibold">Tray Table</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => {
                  if (!userInfo) {
                    toast({
                      description: "Please sign in to submit a review.", variant: "destructive", action: (
                        <ToastAction className="border-none" altText="Try again">
                          <Button
                            onClick={() => {
                              sessionStorage.setItem("returnUrl", window.location.pathname);
                              navigate("/auth/login");
                            }}
                            className="shadow-md hover:shadow-none hover:bg-neutral-700"
                          >
                            Login
                          </Button>
                        </ToastAction>
                      ),
                    });
                  } else {
                    setIsModalOpen(true)
                  }

                }}
                className="bg-black text-white px-8 rounded-full"
              >
                Write Review
              </Button>

            </div>
          </div>
          <div className="mt-12">
            {reviews?.length ?
              <div className="flex justify-between items-center">
                <p className="text-[1.75rem] font-semibold">{reviews?.length} Reviews</p>
                <div className="flex justify-end mb-2">
                  <select className="border rounded px-2 py-1" defaultValue="Newest">
                    <option value="Newest">Newest</option>
                  </select>
                </div>
              </div>
              :
              <p className="my-5 text-center ">
                No reviews yet
              </p>}
            <div className="max-h-[600px] overflow-y-auto pr-2">
              {/* {reviews?.map((review, index) => {
                console.log(review, index);
              })} */}
              {reviews?.map((review, index) => (
                <div key={index} className="border-b mt-5 pb-5 flex gap-6">
                  <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-[1.25rem] inter">User_{review?.postedBy?._ref}</p>
                        <div className="flex gap-1 mt-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                    <div className="mt-2 text-sm text-blue-500">
                      <span>Like</span> | <span>Reply</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={(b) => setIsModalOpen(b)}>
        <DialogContent>
          <DialogHeader>
            <h6 className="text-lg font-medium">Write a Review</h6>
          </DialogHeader>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <input type="hidden" value={userInfo?._id} />
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
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                Submit Review
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Product;