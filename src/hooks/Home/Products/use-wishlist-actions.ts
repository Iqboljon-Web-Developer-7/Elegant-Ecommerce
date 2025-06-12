import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/utils/Client";
import { SANITY_USER_WISHLIST } from "@/utils/Data";
import { v4 as uuidv4 } from "uuid";

export function useWishlistActions() {
  const queryClient = useQueryClient();

  const addToWishlist = useMutation({
    mutationFn: async ({ userId, productId, username }: { userId: string; productId: number; username: string }) => {
      let wishlist = await client.fetch(SANITY_USER_WISHLIST(userId));
      if (!wishlist) {
        wishlist = await client.create({
          _type: "wishlist",
          userId,
          name: `${username}'s Wishlist`,
          items: [
            {
              _key: uuidv4(),
              product: { _type: "reference", _ref: productId },
            },
          ],
        });
      } else {
        const duplicate = wishlist.items.some((item: any) => item.product._ref === productId);
        if (!duplicate) {
          await client
            .patch(wishlist._id)
            .setIfMissing({ items: [] })
            .append("items", [
              {
                _key: uuidv4(),
                product: { _type: "reference", _ref: productId },
              },
            ])
            .commit();
        }
      }
      // Invalidate or refetch queries as needed
      queryClient.invalidateQueries({ queryKey: ["user-wishlist", userId] });
      queryClient.invalidateQueries({ queryKey: ["product-in-wishlist", userId, productId] });
      return true;
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async ({ userId, productId }: { userId: string; productId: number }) => {
      const wishlist = await client.fetch(SANITY_USER_WISHLIST(userId));
      if (wishlist) {
        const filteredItems = wishlist.items.filter((item: any) => item.product._ref !== productId);
        await client.patch(wishlist._id).set({ items: filteredItems }).commit();
      }
      // Invalidate or refetch queries as needed
      queryClient.invalidateQueries({ queryKey: ["user-wishlist", userId] });
      queryClient.invalidateQueries({ queryKey: ["product-in-wishlist", userId, productId] });
      return true;
    },
  });

  return { addToWishlist, removeFromWishlist };
} 