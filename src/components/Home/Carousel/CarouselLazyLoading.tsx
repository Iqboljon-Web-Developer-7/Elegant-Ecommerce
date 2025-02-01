import React, { useState, useCallback } from "react";

type PropType = {
  imgSrc: string;
  inView: boolean;
  index: number;
};

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView } = props;
  const [hasLoaded, setHasLoaded] = useState(false);

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  return (
    <div className="embla__slide">
      <div
        className={"embla__lazy-load".concat(
          hasLoaded ? " embla__lazy-load--has-loaded" : ""
        )}
      >
        <img
          className="embla__slide__img embla__lazy-load__img w-full"
          onLoad={setLoaded}
          src={inView ? imgSrc : undefined}
          alt="Your alt text"
        />
        {!hasLoaded && <span className="embla__lazy-load__spinner" />}
      </div>
    </div>
  );
};
