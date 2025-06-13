import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/utils/Client";
import { SANITY_USER_WISHLIST } from "@/utils/Data";

interface WishlistItem {
  [key: string]: any;
}

export function useUserWishlist(userId?: string) {
  const queryClient = useQueryClient();

  const {
    data: wishlist,
    isLoading,
    error,
  } = useQuery<
    { items: WishlistItem[] } | null,
    Error
  >({
    queryKey: ["user-wishlist", userId],
    queryFn: async () => {
      if (!userId) return null;
      const result = await client.fetch(SANITY_USER_WISHLIST(userId));
      return result || { items: [] };
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (!userId) return;
    const subscription = client
      .listen(SANITY_USER_WISHLIST(userId))
      .subscribe((update: any) => {
        if (update.result) {
          queryClient.setQueryData(["user-wishlist", userId], update.result);
        }
      });
    return () => subscription.unsubscribe();
  }, [userId, queryClient]);

  return {
    wishlist: wishlist?.items || [],
    isLoading,
    error,
  };
} 