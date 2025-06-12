import React, { useState, useEffect } from "react";

type PropType = {
  imgSrc: string;
  inView: boolean;
  index: number;
};

export const LazyLoadImage: React.FC<PropType> = ({ imgSrc, inView }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!inView) {
      setIsLoaded(false);
      setProgress(0);
      setImageUrl(null);
      return;
    }

    const xhr = new XMLHttpRequest();

    xhr.open("GET", imgSrc, true);
    xhr.responseType = "blob";

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      const blob = xhr.response;
      const objectUrl = URL.createObjectURL(blob);
      setImageUrl(objectUrl);
      setIsLoaded(true);
    };

    xhr.onerror = () => {
      console.error("Image failed to load");
    };

    xhr.send();

    return () => {
      xhr.abort();
    };
  }, [imgSrc, inView]);

  return (
    <div className="embla__slide relative">
      {!isLoaded && inView && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 flex-col">
          <svg
            className="w-16 h-16 mb-2 transform animate-spin"
            viewBox="0 0 36 36"
          >
            <circle
              className="text-gray-300"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              r="16"
              cx="18"
              cy="18"
            />
            <circle
              className="text-blue-500"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              r="16"
              cx="18"
              cy="18"
              strokeDasharray="100"
              strokeDashoffset={`${100 - progress}`}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.3s ease",
              }}
            />
          </svg>
        </div>
      )}

      {imageUrl && (
        <img
          className={`w-full h-full object-cover ${imageUrl && "animate-fade-in-scale"}`}
          src={imageUrl}
          alt={`Slide image`}
          loading="eager"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      )}
    </div>
  );
};
