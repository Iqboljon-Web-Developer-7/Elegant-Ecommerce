import React from "react";

type PropType = {
  imgSrc: string;
  inView: boolean;
  index: number;
};


export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView } = props;

  return (
    <div className="embla__slide">
      <div
        className={"embla__lazy-load grid items-center embla__lazy-load--has-loaded"}
      >
        <img
          className="embla__slide__img embla__lazy-load__img w-full"
          src={inView ? imgSrc : undefined}
          alt="Your alt text"
        />
      </div>
    </div>
  );
};
