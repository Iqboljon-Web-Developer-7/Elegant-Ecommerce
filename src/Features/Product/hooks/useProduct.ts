import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/Client";
import { SANITY_PRODUCT_QUERY } from "@/utils/Data";
import { ProductType } from "@/lib/types";

export const fetchProduct = async (id: string): Promise<ProductType> => {
  return await client.fetch(SANITY_PRODUCT_QUERY(id));
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });
}; 