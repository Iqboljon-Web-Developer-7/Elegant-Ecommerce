// @ts-nocheck

import React, { useEffect, FC, useState, useMemo } from "react";
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
import { urlFor } from "@/utils/Client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { ToastAction } from "@/components/ui/toast";
import { useCreateReview, useDeleteReview, useProductReviews } from "./hooks/useReviews";
import { Star } from "lucide-react";
import { StarRating } from "./_components/StarRating";

const Product: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const navigate = useNavigate()

  const { toast } = useToast();

  const { data: productData, isError } = useProduct(id);
  const { variants, title, images, _createdAt, description } = productData || {};

  const { data: reviewPages, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductReviews(id);
  const reviews = useMemo(() => reviewPages?.pages.flat() || [], [reviewPages]);

  const userInfo = useSelector((state: any) => state.PermanentData.userInfo);
  const { color: selColor, variant: selVariant, quantity: selQty } = Object.fromEntries(searchParams);
  const selectedVariant = variants?.find(v => v.title === selVariant);

  const allImgs = useMemo(() => images?.flatMap(v => v.images?.map(i => ({ src: i.src, color: v.color })) || []), [images]);
  const filteredImages = useMemo(() => allImgs?.filter(i => i.color === selectedVariant?.color), [allImgs, selectedVariant]);

  const { mutate: createReview, isPending: isCretingReview, isError: isCreateReviewError } = useCreateReview(id!);
  const deleteReview = useDeleteReview(id!);

  if (selectedVariant && +selQty > selectedVariant.stock) {
    setSearchParams({
      "quantity": selectedVariant.stock.toString(),
    }, { replace: true });
  }

  useEffect(() => {
    const vi = variants?.find(v => v.stock > 0);
    if (vi) setSearchParams({ color: vi.color, variant: vi.title, quantity: '1' }, { replace: true });
  }, [productData]);

  if (isError) return <div className="py-20 text-center text-lg text-red-500">Failed to load product.</div>;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo?._id) {
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

    createReview({ rating: newReview.rating, comment: newReview.comment, userId: userInfo._id });
    setNewReview({ rating: 0, comment: '' });
    setIsModalOpen(false);
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
          filteredImages?.length &&
          <meta property="og:image" content={urlFor(filteredImages[0]?.src).url()} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {<meta name="twitter:description" content={description?.slice(0, 80)} />}
        {(
          filteredImages?.length &&
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
          <Carousel createdAt={_createdAt} selectedVariant={selectedVariant!} filteredImages={filteredImages || []} />
          <ProductData
            productData={productData}
            selectedParamColor={selColor}
            selectedParamVariant={selVariant}
            selectedParamQuantity={+selQty}
            selectedVariant={selectedVariant!}
          />
        </div>
        <div className="mt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Customer Reviews ({reviews.length})</h2>
            <Button onClick={() => setIsModalOpen(true)}>Write Review</Button>
          </div>

          <div className="space-y-6 mt-4 max-h-96 overflow-y-auto">
            {reviews.map((r, idx) => (
              <div key={idx} className="flex gap-4">
                <img src={r.postedBy.image ? urlFor(r.postedBy.image).url() : '/placeholder.png'} alt={r.postedBy.name} className="w-14 h-14 rounded-full" />
                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{r.postedBy.name}</p>
                    {r.postedBy._id === userInfo?._id && (
                      <button onClick={() => deleteReview.mutate(r._id)} aria-label="Delete review">
                        <Trash2 className="text-red-500" />
                      </button>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => <Star key={i} className={i < r.rating ? 'text-yellow-400' : 'text-gray-300'} />)}
                  </div>
                  <p className="mt-1">{r.comment}</p>
                  <div className="flex gap-4 text-sm mt-2">
                    <button>👍 {r.likes?.length || 0}</button>
                    <button>💬 {r.replies?.length || 0}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-4 text-center">
              <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader><h6>Write a Review</h6></DialogHeader>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <StarRating value={newReview.rating} onChange={val => setNewReview({ ...newReview, rating: val })} />
            <textarea value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} className="w-full p-2 border rounded" rows={4} required />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Product;