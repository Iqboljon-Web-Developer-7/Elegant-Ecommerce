import { client } from "@/utils/Client"
import { SANITY_PRODUCT_REVIEWS } from "@/utils/Data"
import { useInfiniteQuery } from "@tanstack/react-query"

interface Reviews {
    reviews: {
        rating: number;
        comment: string;
        _key: string;
        postedBy: {
            _ref: string;
        };
    }[]
}

const getProductReviews = async (id: string | undefined, start: number, end: number): Promise<Reviews> => {
    return await client.fetch(SANITY_PRODUCT_REVIEWS(id!, start, end))
}

export const useProductReviews = (id: string | undefined, start: number, end: number) => {
    return useInfiniteQuery({
        queryKey: ['product-reviews', id],
        queryFn: async ({ pageParam = 0 }) => {
            const start = pageParam * 10;
            const end = start + 10;
            return getProductReviews(id, start, end)
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => lastPage.reviews?.length == 10 ? allPages.length : undefined
    })
}
// useQuery({
//     queryKey: ["productReviews"],
//     queryFn: () => getProductReviews(id, start, end),
//     staleTime: 60 * 60 * 1000, // 1 hour
//     enabled: !!id,
// })