import React from "react";

const SkeletonLoader = ({ count = 1 }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`bg-neutral-200 bg-right sm:bg-top bg-no-repeat bg-contain sm:bg-cover relative min-h-48 ${
            index === 0 && "row-span-2 min-h-96 bg-top"
          } animate-pulse`}
        >
          <div className="absolute bottom-10 left-10 grid space-y-4">
            <div className="h-8 bg-neutral-300 w-3/4 rounded"></div>
            <div className="h-4 bg-neutral-300 w-1/3 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
