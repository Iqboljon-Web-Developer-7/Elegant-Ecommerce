import { urlFor } from "@/utils/Client";
import { collectionType } from "@/lib/types";

import SkeletonLoader from "./SkeletonLoader";
import StyledLink from "@/styledComponents/StyledLink";
import { useSelector } from "react-redux";

const ShopCollection = () => {
  const collections = useSelector(
    (state: { HomePageData: { collections: collectionType[] } }) =>
      state.HomePageData.collections
  );

  const Collections = collections?.map((item, index) => (
    <div
      key={index}
      style={{
        backgroundImage: `url("${item && urlFor(item.image?.asset?._ref)}")`,
      }}
      className={`bg-neutral-200 bg-right sm:bg-top bg-no-repeat bg-contain sm:bg-cover relative min-h-48 ${
        index === 0 && "row-span-2 min-h-96 bg-top"
      }`}
    >
      <div className="absolute bottom-10 left-10 grid text-black-800">
        <h3 className="text-[2.125rem]">{item?.title}</h3>
        <StyledLink destination={item?.url} name={item?.urlName} />
      </div>
    </div>
  ));

  return (
    <div className="mt-5 md:mt-12">
      <h2 className=" text-2xl sm:text-3xl md:text-[2.5rem] sm:text-left text-center">
        Shop Collection
      </h2>
      <div className="min-h-[44rem] grid sm:grid-cols-2 gap-6 mt-12">
        {collections.length ? Collections : <SkeletonLoader count={3} />}
      </div>
    </div>
  );
};

export default ShopCollection;
