import { useState, useEffect } from "react";
import { SANITY_INSTAFEED_QUERY } from "@/utils/Data";
import { client, urlFor } from "@/utils/Client";
import { ImageTypeArray } from "@/lib/types";

const InstagramFeed = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await client.fetch(SANITY_INSTAFEED_QUERY);
        const imageUrls = data?.map(
          (item: ImageTypeArray) => item.image[0].asset?._ref
        );

        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="py-6 md:py-12 px-2 md:px-6">
      <div className="text-center mb-10 flex flex-col gap-2 md:gap-4">
        <p className="inter font-semibold text-neutral-400 tracking-wide uppercase text-sm sm:text-base">
          Newsfeed
        </p>
        <h5
        // className="text-xl sm:text-2xl lg:text-[2.5rem] font-normal text-gray-800"
        >
          Instagram
        </h5>
        <p className="inter text-neutral-900 mt-0 md:mt-2 text-sm sm:text-base lg:text-[1.25rem]">
          Follow us on social media for more discounts & promotions
        </p>
        <p className="text-neutral-400 font-medium mt-1 text-sm sm:text-base lg:text-[1.25rem]">
          @3legant_official
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-6">
        {images?.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden hover:shadow-md duration-200 relative"
          >
            <img
              src={`${urlFor(image).toString()}`}
              loading="lazy"
              width={262}
              height={262}
              alt={`Instagram Post ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;
