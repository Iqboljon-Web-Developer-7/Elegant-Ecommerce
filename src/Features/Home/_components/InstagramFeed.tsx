import { urlFor } from "@/utils/Client";
import { useInstaFeed } from "@/hooks/Home/InstagramFeed/useInstaFeed";
import { useInView } from "react-intersection-observer";

const Skeleton = () => (
  <div className="overflow-hidden relative">
    <div
      className="w-full h-[250px] bg-neutral-200 animate-pulse"
      // style={{ aspectRatio: "1/1" }}
    />
  </div>
);

export default function InstagramFeed() {
  const [ref, inView] = useInView();
  const { data: images, isError, isLoading } = useInstaFeed(inView);

  if (isError) {
    return <div>Error loading Instagram feed</div>;
  }

  return (
    <div className="py-6 md:py-12 px-2 md:px-6" ref={ref}>
      <div className="text-center mb-10 flex flex-col gap-2 md:gap-4">
        <p className="inter font-semibold text-neutral-400 tracking-wide uppercase text-sm sm:text-base">
          Newsfeed
        </p>
        <h5>
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
        {isLoading ? (
          Array(4)
            .fill(0)
            .map((_, index) => <Skeleton key={index} />)
        ) : (
          images?.map((image, index) => (
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
          ))
        )}
      </div>
    </div>
  );
}