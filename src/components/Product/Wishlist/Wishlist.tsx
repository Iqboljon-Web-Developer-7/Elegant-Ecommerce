import { useToast } from "@/hooks/use-toast";
import { client } from "@/utils/Client";
import { SANITY_USER_WISHLIST } from "@/utils/Data";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


const useWishlist = (
    userId: string,
    productDataId: number,
    productColor: string,
    productVariant: string
) => {
    const { toast } = useToast();
    const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Reusable function to check if the product is in the wishlist
    const checkIfSavedWishlist = useCallback(async () => {
        try {
            setIsInWishlist(p => !p);
            const userWishlist = await client.fetch(SANITY_USER_WISHLIST(userId));
            if (userWishlist) {
                const exists = userWishlist.items.some((item: any) =>
                    item.product._ref === productDataId &&
                    item.color === productColor &&
                    item.variant === productVariant
                );
                setIsInWishlist(exists);
            }
        } catch (error) {
            console.error("Error checking wishlist:", error);
        }
    }, [userId, productDataId, productColor, productVariant]);

    useEffect(() => {
        if (userId && productDataId) {
            checkIfSavedWishlist();
        }
    }, [userId, productDataId, checkIfSavedWishlist]);

    const saveWishlist = useCallback(async () => {
        setIsLoading(true);
        try {
            let userWishlist = await client.fetch(SANITY_USER_WISHLIST(userId));
            if (!userWishlist) {
                userWishlist = await client.create({
                    _type: "wishlist",
                    userId,
                    name: `Wishlist`,
                    items: [
                        {
                            _key: uuidv4(),
                            product: { _type: "reference", _ref: productDataId },
                            color: productColor,
                            variant: productVariant,
                        },
                    ],
                });
                toast({ description: "Wishlist created and product added successfully!" });
                setIsInWishlist(true);
            } else {
                const duplicate = userWishlist.items.some((item: any) =>
                    item.product._ref === productDataId &&
                    item.color === productColor &&
                    item.variant === productVariant
                );
                if (!duplicate) {
                    await client
                        .patch(userWishlist._id)
                        .setIfMissing({ items: [] })
                        .append("items", [
                            {
                                _key: uuidv4(),
                                product: { _type: "reference", _ref: productDataId },
                                color: productColor,
                                variant: productVariant,
                            },
                        ])
                        .commit();
                    toast({ description: "Product added to wishlist successfully!" });
                    setIsInWishlist(true);
                } else {
                    toast({ description: "Item already exists in the wishlist.", variant: "destructive" });
                }
            }
        } catch (error) {
            toast({
                title: "Error adding to wishlist!",
                description: `${error}`,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [userId, productDataId, productColor, productVariant, toast]);

    const removeWishlist = useCallback(async () => {
        setIsLoading(true);
        try {
            const userWishlist = await client.fetch(SANITY_USER_WISHLIST(userId));
            if (userWishlist) {
                const filteredItems = userWishlist.items.filter((item: any) =>
                    !(
                        item.product._ref === productDataId &&
                        item.color === productColor &&
                        item.variant === productVariant
                    )
                );
                await client
                    .patch(userWishlist._id)
                    .set({ items: filteredItems })
                    .commit();
                toast({ description: "Product removed from wishlist successfully!" });
                setIsInWishlist(false);
            }
        } catch (error) {
            toast({
                title: "Error removing from wishlist!",
                description: `${error}`,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [userId, productDataId, productColor, productVariant, toast]);

    return { isInWishlist, isLoading, saveWishlist, removeWishlist, checkIfSavedWishlist };
};

export default useWishlist