import {  urlFor } from "@/utils/Client";
import { CollectionType } from "@/lib/types";
import SkeletonLoader from "./SkeletonLoader";
import StyledLink from "@/components/atoms/StyledLink";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useCollections } from "@/hooks/Home/ShopCollection/useCollection";

const ShopCollection = () => {
  const [mainRef, inView] = useInView({ triggerOnce: true, threshold: 0.6 });
  const { data: collections, isLoading } = useCollections(inView)

  const Collections = useMemo(
    () =>
      collections?.map((item: CollectionType, index: number) => (
        <div
          key={index}
          style={{
            backgroundImage: `url("${item && urlFor(item.image?.asset?._ref)}")`,
          }}
          className={`bg-neutral-200 bg-right sm:bg-top bg-no-repeat bg-contain sm:bg-cover relative min-h-48 ${index === 0 && "row-span-2 min-h-96 bg-top"}`}
        >
          <div className="absolute bottom-10 left-10 grid text-black">
            <h5>{item?.title}</h5>
            <StyledLink destination={item?.url} name={item?.urlName} />
          </div>
        </div>
      )),
    [collections]
  );

  return (
    <div className="mt-5 md:mt-12"
      ref={mainRef}
    >
      <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] sm:text-left text-center">
        Shop Collection
      </h2>
      <div className="min-h-[44rem] grid sm:grid-cols-2 gap-6 md:mt-12">
        {isLoading || !Collections?.length ? <SkeletonLoader count={3} /> : Collections}
      </div>
    </div>
  );
};

export default ShopCollection;
