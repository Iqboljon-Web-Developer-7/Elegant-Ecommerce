import { client } from "@/utils/Client";
import { SANITY_COLLECTIONS_QUERY } from "@/utils/Data";
import { useQuery } from "@tanstack/react-query";

const fetchCollections = async () => {
    const data = await client.fetch(SANITY_COLLECTIONS_QUERY);
    return data;
  };

export const useCollections = (inView: boolean) => useQuery({
    queryKey: ['collections'],
    queryFn: fetchCollections,
    enabled: inView,
    staleTime: 30 * 60 * 1000 // 30 minutes
  });