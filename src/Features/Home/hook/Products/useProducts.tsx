import { ProductType } from "@/lib/types";
import { client } from "@/utils/Client";
import { SANITY_PRODUCTS_QUERY } from "@/utils/Data";
import { useQuery } from "@tanstack/react-query";

const fetchedProducts = async ():Promise<ProductType[]> => await client.fetch(
    SANITY_PRODUCTS_QUERY(0, 20)
  );

 export const useProducts = (inView:boolean) => useQuery({
    queryKey:["home-products"],
    queryFn:fetchedProducts,
    enabled: inView,
  });
