import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { useEffect, useState } from "react";
import { client, urlFor } from "@/utils/Client";

interface collectionType {
  image: { asset: { _ref: string } };
  title: string;
  url: string;
}
const ShopCollection = () => {
  const [collection, setCollection] = useState<collectionType[]>([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "collection"] | order(_createdAt)`)
      .then((data) => setCollection(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(collection[0]);

  return (
    <div className="mt-8 md:mt-12">
      <h2 className="text-3xl sm:text-[2.5rem] sm:text-left text-center">
        Shop Collection
      </h2>
      <div className="min-h-[44rem] grid sm:grid-cols-2 gap-6 mt-6 md:mt-12">
        <div
          style={{
            backgroundImage: `url("${collection[0] && urlFor(collection[0]?.image?.asset?._ref)}")`,
          }}
          className="row-span-2 bg-grey-200 bg-top bg-no-repeat bg-contain sm:bg-cover relative min-h-96"
        >
          <div className="absolute bottom-10 left-10 grid text-black-800">
            <h4 className="text-[2.125rem]">{collection[0]?.title}</h4>
            <Link
              to={collection[0]?.url}
              className="text-base w-fit flex items-center gap-2 border-b border-b-black-800"
            >
              Collection <GoArrowRight />
            </Link>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url("${collection[1] && urlFor(collection[1]?.image?.asset?._ref)}")`,
          }}
          className="bg-grey-200 bg-right sm:bg-top bg-no-repeat bg-contain sm:bg-cover relative min-h-48 "
        >
          <div className="absolute bottom-10 left-10 grid text-black-800">
            <h4 className="text-[2.125rem]">Earbuds</h4>
            <Link
              to={collection[1]?.url}
              className="text-base w-fit flex items-center gap-2 border-b border-b-black-800"
            >
              Collection <GoArrowRight />
            </Link>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url("${collection[2] && urlFor(collection[2]?.image?.asset?._ref)}")`,
          }}
          className="bg-grey-200 bg-right sm:bg-top bg-no-repeat bg-contain sm:bg-cover relative min-h-48 "
        >
          <div className="absolute bottom-10 left-10 grid text-black-800">
            <h4 className="text-[2.125rem]">Accessories</h4>
            <Link
              to={collection[2]?.url}
              className="text-base w-fit flex items-center gap-2 border-b border-b-black-800"
            >
              Collection <GoArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCollection;
