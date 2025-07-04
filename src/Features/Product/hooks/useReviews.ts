import { client } from '@/utils/Client';
import { SANITY_PRODUCT_REVIEWS } from '@/utils/Data';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { v4 as uuidv4 } from 'uuid';

interface Review {
    reviews: {
        rating: number;
        comment: string;
        _key: string;
        postedBy: {
            _ref: string;
        };
    }[]
}

export const fetchProductReviews = async (id: string | undefined, start: number, end: number) => {
    if (!id) throw new Error('Missing product id');
    console.log(id);

    const res = await client.fetch<Review[]>(SANITY_PRODUCT_REVIEWS(id, start, end));
    console.log(res);
    return res
}
    ;

export const useProductReviews = (productId?: string) => {
    return useInfiniteQuery<Review[], Error>({
        queryKey: ['product-reviews', productId],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 0 }) => {
            const start = Number(pageParam) * 5;
            const end = start + 5;
            if (!productId) throw new Error("Missing productId");
            return fetchProductReviews(productId, start, end)
        },
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length === 5 ? pages.length : undefined;
        },
        enabled: !!productId,
        staleTime: 1000 * 60 * 10,
    });
};

export const useCreateReview = (productId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ rating, comment, userId }: { rating: number; comment: string; userId: string }) => {
            const reviewDoc = {
                _id: uuidv4(),
                _type: 'review',
                product: { _type: 'reference', _ref: productId },
                postedBy: { _type: 'reference', _ref: userId },
                rating,
                comment,
                createdAt: new Date().toISOString(),
            };
            return client.createIfNotExists(reviewDoc);
        },
        // onMutate: async newReview => {
        //     const res = await client.createIfNotExists()
        //     // const previous = qc.getQueryData<Review[][]>(['product-reviews', productId]);
        //     // qc.setQueryData<Review[][]>(['product-reviews', productId], old => {
        //     //     const flat = old?.flat() || [];
        //     //     const temp: Review = {
        //     //         _id: 'temp-' + Date.now(),
        //     //         rating: newReview.rating,
        //     //         comment: newReview.comment,
        //     //         _createdAt: new Date().toISOString(),
        //     //         postedBy: { _id: newReview.userId, name: qc.getQueryData(['user', newReview.userId])?.name || 'You' },
        //     //         likes: [],
        //     //         replies: []
        //     //     } as any;
        //     //     return [[temp, ...flat]];
        //     // });
        //     // return { previous };
        // },
        onError: (_err, _newReview, context: any) => {
            console.log(_err);

            qc.setQueryData(['product-reviews', productId], context.previous);
        },
        onSettled: () => {
            console.log("successfully created review");
            
            qc.invalidateQueries(
                {
                    queryKey: ['posts'],
                    refetchType: 'active',
                },
            );
        }
    }
    );
};

export const useDeleteReview = (productId: string) => {
    const qc = useQueryClient();
    return useMutation(
        {
            mutationFn: async (reviewId: string) => client.delete(reviewId),
            onMutate: async reviewId => {
                await qc.cancelQueries({ queryKey: ['product-reviews', productId], exact: true });
                const previous = qc.getQueryData<Review[][]>(['product-reviews', productId]);
                qc.setQueryData<Review[][]>(['product-reviews', productId], old =>
                    old?.map(page => page.filter(r => r._id !== reviewId))
                );
                return { previous };
            },
            onError: (_err, _reviewId, context: any) => {
                qc.setQueryData(['product-reviews', productId], context.previous);
            },
            onSettled: () => {
                qc.invalidateQueries({ queryKey: ['product-reviews', productId] });
            }
        }
    );
};