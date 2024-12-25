import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { useEffect, useState } from "react";
import { client, urlFor } from "@/utils/Client";
import { SANITY_COLLECTIONS_QUERY } from "@/utils/Data";
import { collectionType } from "@/lib/types";

import Loading from "./Loading";
import NoInternet from "@/components/noInternet";

const ShopCollection = () => {
  const [collection, setCollection] = useState<collectionType[]>([]);
  const [collectionError, setCollectionError] = useState("");

  useEffect(() => {
    client
      .fetch(SANITY_COLLECTIONS_QUERY)
      .then((data) => setCollection(data))
      .catch((error) => setCollectionError(error));
  }, []);

  const Collections = collection?.map((_, index) => (
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
        <Link
          to={collection[index]?.url}
          className="text-base w-fit flex items-center gap-2 border-b border-b-neutral-900"
        >
          {collection[index]?.urlName} <GoArrowRight />
        </Link>
      </div>
    </div>
  ));

  if (collection.length <= 0 && !collectionError) {
    return <Loading />;
  }

  return (
    <div className="mt-8 md:mt-12">
      <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] sm:text-left text-center">
        Shop Collection
      </h2>
      {/* {collection.length <= 0 && !collectionError && <Loading />} */}
      {collectionError && <NoInternet className="mt-4" />}
      {collection.length >= 1 && (
        <div className="min-h-[44rem] grid sm:grid-cols-2 gap-6 mt-6 md:mt-12">
          {Collections}
        </div>
      )}
    </div>
  );
};

export default ShopCollection;
