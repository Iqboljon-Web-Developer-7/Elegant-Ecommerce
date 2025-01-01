import { useState } from "react";

const InstagramFeed = () => {
  const images = [
    "https://picsum.photos/262/261",
    "https://picsum.photos/262/262",
    "https://picsum.photos/262/263",
    "https://picsum.photos/262/264",
  ];

  const [loading, setLoading] = useState<boolean[]>(
    new Array(images.length).fill(true)
  );

  const handleImageLoad = (index: number) => {
    setLoading((prevState) => {
      const newLoadingState = [...prevState];
      newLoadingState[index] = false;
      return newLoadingState;
    });
  };

  return (
    <div className="bg-white py-6 md:py-12 px-2 md:px-6">
      <div className="text-center mb-10 flex flex-col sm:gap-2 md:gap-4">
        <p className="inter font-semibold text-neutral-400 tracking-wide uppercase text-sm sm:text-base">
          Newsfeed
        </p>
        <h4 className="text-xl sm:text-2xl lg:text-[2.5rem] font-normal text-gray-800">
          Instagram
        </h4>
        <p className="inter text-neutral-900 mt-0 md:mt-2 text-sm sm:text-base lg:text-[1.25rem]">
          Follow us on social media for more discounts & promotions
        </p>
        <p className="text-neutral-400 font-medium mt-1 text-sm sm:text-base lg:text-[1.25rem]">
          @3legant_official
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden hover:shadow-md duration-200 relative"
          >
            {loading[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={image}
              loading="lazy"
              width={262}
              height={262}
              alt={`Instagram Post ${index + 1}`}
              className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
                loading[index] ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;
