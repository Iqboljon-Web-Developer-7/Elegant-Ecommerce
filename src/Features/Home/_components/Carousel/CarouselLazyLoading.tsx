import React, { useState, useEffect } from "react";

type PropType = {
  imgSrc: string;
  inView: boolean;
  index: number;
};

export const LazyLoadImage: React.FC<PropType> = ({ imgSrc, inView }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset loading state when out of view
  useEffect(() => {
    if (!inView) {
      setIsLoaded(false);
    }
  }, [inView]);

  return (
    <div className="embla__slide relative">
      {inView && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <svg
            className="animate-spin h-8 w-8 text-gray-600"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      )}
      <div className="embla__lazy-load grid items-center embla__lazy-load--has-loaded">
        {inView && (
          <img
            className="embla__slide__img embla__lazy-load__img w-full"
            src={imgSrc}
            alt="Your alt text"
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>
    </div>
  );
};
