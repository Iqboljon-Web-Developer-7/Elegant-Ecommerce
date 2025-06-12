import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/Client";
import { SANITY_IS_PRODUCT_IN_WISHLIST } from "@/utils/Data";

export function useProductInWishlist(userId?: string, productId?: number) {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product-in-wishlist", userId, productId],
    queryFn: async () => {
      if (!userId || !productId) return false;
      const result = await client.fetch(SANITY_IS_PRODUCT_IN_WISHLIST(userId, productId));
      return !!result;
    },
    enabled: !!userId && !!productId,
  });

  return {
    isInWishlist: !!data,
    isLoading,
    error,
  };
} 