import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/Client";
import { SANITY_PRODUCT_QUERY } from "@/utils/Data";
import { ProductType } from "@/lib/types";

const fetchProduct = async (id: string): Promise<ProductType> => {
  return await client.config({ useCdn: false }).fetch(SANITY_PRODUCT_QUERY(id));
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });
}; 