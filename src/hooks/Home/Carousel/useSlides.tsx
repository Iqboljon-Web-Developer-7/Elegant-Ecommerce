// hooks/useSlides.ts
import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/Client";
import { SANITY_SLIDES_QUERY } from "@/utils/Data";
import { SlideType } from "@/lib/types";

const fetchSlides = async (): Promise<SlideType[]> => {
  return await client.fetch(SANITY_SLIDES_QUERY);
};

export const useSlides = () => {
  return useQuery({
    queryKey: ["slides"],
    queryFn: () => fetchSlides(),
    refetchInterval: 300000,
  });
};
