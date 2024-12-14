import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { LazyLoadImage } from "./CarouselLazyLoading";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import { DotButton, useDotButton } from "./CarouselDotButtons";
import { urlFor } from "@/utils/Client";

type PropType = {
  slides: slidesType[];
  options?: EmblaOptionsType;
};

type slidesType = {
  images: {
    asset: { _ref: string };
  };
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRed, emblaApi] = useEmblaCarousel(options);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off("slidesInView", updateSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  console.log(slides);

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRed}>
        <div className="embla__container">
          {slides[0]?.images ? (
            slides?.map((item, index) => (
              <LazyLoadImage
                key={index}
                index={index}
                imgSrc={`${urlFor(item?.images?.asset?._ref)}`}
                inView={slidesInView.indexOf(index) > -1}
              />
            ))
          ) : (
            <div className="min-h-40 bg-black-800 w-full flex items-center justify-center">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            className="absolute w-10 h-10 rounded-full items-center justify-center left-4 top-[50%] translate-y-[-50%]  bg-white disabled:opacity-60 hidden md:flex"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            className="absolute w-10 h-10 rounded-full items-center justify-center right-4 top-[50%] translate-y-[-50%]  bg-white disabled:opacity-60 hidden md:flex"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>

        <div className="w-full absolute bottom-12 left-0 right-0 flex items-center justify-center gap-3">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"w-3 h-3 rounded-full bg-white transition-all".concat(
                index === selectedIndex ? " !w-10" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
