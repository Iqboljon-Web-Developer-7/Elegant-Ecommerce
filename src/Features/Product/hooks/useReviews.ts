import { client } from "@/utils/Client"; // Adjust import based on your setup
// import { UserType } from "@/lib/types";

export const SANITY_CREATE_REVIEW = async (productId: string, review: { rating: number; comment: string }, userId: string) => {
  const reviewDoc = {
    _type: "review",
    rating: review.rating,
    comment: review.comment,
    postedBy: { _ref: userId },
  };

  // Create the review and patch it into the product's reviews array
  const transaction = client.transaction()
    .create(reviewDoc)
    .patch(productId, (p) => p.insert("after", "reviews[-1]", [{ _key: reviewDoc._id, ...reviewDoc }]))
    .commit();

  return transaction;
};