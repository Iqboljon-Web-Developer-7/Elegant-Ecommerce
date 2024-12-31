import { useEffect, useState } from "react";
import { client, urlFor } from "@/utils/Client";
import { SANITY_COLLECTIONS_QUERY } from "@/utils/Data";
import { collectionType } from "@/lib/types";

import SkeletonLoader from "./SkeletonLoader";
import NoInternet from "@/components/noInternet";
import StyledLink from "@/styledComponents/StyledLink";

const ShopCollection = () => {
  const [collection, setCollection] = useState<collectionType[]>([]);
  const [collectionError, setCollectionError] = useState("");

  useEffect(() => {
    client
      .fetch(SANITY_COLLECTIONS_QUERY)
      .then((data) => setCollection(data))
      .catch((error) => setCollectionError(error.message));
  }, []);

  const Collections = collection.map((_, index) => (
    <div
      key={index}
      style={{
        backgroundImage: `url("${collection[index] && urlFor(collection[index].image?.asset?._ref)}")`,
      }}
      className={`bg-neutral-200 bg-right sm:bg-top bg-no-repeat bg-contain sm:bg-cover relative min-h-48 ${
        index === 0 && "row-span-2 min-h-96 bg-top"
      }`}
    >
      <div className="absolute bottom-10 left-10 grid text-black-800">
        <h3 className="text-[2.125rem]">{collection[index]?.title}</h3>
        <StyledLink
          destination={collection[index]?.url}
          name={collection[index]?.urlName}
        />
      </div>
    </div>
  ));

  return (
    <div className="mt-5 md:mt-12">
      <h2 className=" text-2xl sm:text-3xl md:text-[2.5rem] sm:text-left text-center">
        Shop Collection
      </h2>
      {collectionError && <NoInternet className="mt-4" />}
      <div className="min-h-[44rem] grid sm:grid-cols-2 gap-6 mt-12">
        {collection.length >= 1 ? Collections : <SkeletonLoader count={3} />}
      </div>
    </div>
  );
};

export default ShopCollection;
