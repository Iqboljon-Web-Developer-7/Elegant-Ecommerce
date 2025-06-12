import { ImageTypeArray } from "@/lib/types";
import { client } from "@/utils/Client";
import { SANITY_INSTAFEED_QUERY } from "@/utils/Data";
import { useQuery } from "@tanstack/react-query";

const fetchInstagramImages = async ():Promise<string[]> => {
  const data = await client.fetch(SANITY_INSTAFEED_QUERY);
  return data?.map((item: ImageTypeArray) => item.image[0].asset?._ref);
};

export const useInstaFeed = (inView:boolean) => useQuery({
  queryKey: ["instagramFeed"],
  queryFn: fetchInstagramImages,
  enabled: inView
});