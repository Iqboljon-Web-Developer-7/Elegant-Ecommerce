import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/Client";
import { SANITY_SLIDES_QUERY } from "@/utils/Data";
import { SlideType } from "@/lib/types";

export const fetchSlides = async (media:string): Promise<SlideType[]> => {
  return await client.fetch(SANITY_SLIDES_QUERY(media));
};

export const useSlides = (media:string) => {
  return useQuery({
    queryKey: ["slides", media],
    queryFn: () => fetchSlides(media as string),
    staleTime: 30 * 60 * 1000 // 0.5 hour    
  });
};
