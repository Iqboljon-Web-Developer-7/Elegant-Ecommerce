import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import { DotButton, useDotButton } from "./CarouselDotButtons";

import { slideType } from "@/lib/types";

import { LazyLoadImage } from "./CarouselLazyLoading";
import "./css/embla.css";
import { urlFor } from "@/utils/Client";

const EmblaCarousel: React.FC<{ slides: slideType[] }> = ({ slides }) => {
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const windowWidth = window.innerWidth;

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView(emblaApi.slidesInView());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    updateSlidesInView(emblaApi);
    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const PlaceholderSlide = () => (
    <div className="embla__slide flex justify-center items-center">
      <div
        className="w-full h-full bg-sky-50"
        style={{
          aspectRatio: windowWidth <= 768 ? "16 / 9" : "3 / 1",
        }}
      >
        <div className="w-full md:w-11/12 mx-auto absolute inset-0 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8 p-6 md:p-10 gap-12">
          <div className="flex flex-col gap-8 w-full md:w-1/2">
            <div className="w-3/4 h-8 bg-gray-300 rounded-md shadow-sm"></div>
            <div className="w-full h-12 bg-gray-300 rounded-lg shadow-md"></div>
            <div className="w-5/6 h-8 bg-gray-300 rounded-md shadow-sm"></div>
          </div>
          <div className="w-full md:w-2/4 h-3/4 bg-gray-300 rounded-lg shadow-xl"></div>
        </div>
      </div>
    </div>
  );

  const Slides = slides
    .filter(
      (item) =>
        (windowWidth <= 768 && item?.media === "mobile") ||
        (windowWidth > 768 && item?.media === "desktop")
    )
    .map((item, index) => {
      const image = `${urlFor(item?.images?.asset?._ref)}`;
      return (
        <div
          key={index}
          className="embla__slide flex justify-center items-center"
          style={{
            aspectRatio: windowWidth <= 768 ? "16 / 9" : "3 / 1",
          }}
        >
          <LazyLoadImage
            index={index}
            imgSrc={image}
            inView={slidesInView.includes(index)}
          />
        </div>
      );
    });

  const Dots = scrollSnaps.map((_, index) => (
    <DotButton
      aria-label={`indicator button ${index + 1}`}
      key={index}
      onClick={() => onDotButtonClick(index)}
      className={"w-3 h-3 rounded-full bg-white transition-all".concat(
        index === selectedIndex ? " !w-10" : ""
      )}
    />
  ));

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {Slides.length > 0
            ? Slides
            : Array.from({ length: 1 }).map((_, i) => (
                <PlaceholderSlide key={i} />
              ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            aria-label="prev-button"
            className="absolute w-11 h-11 rounded-full items-center justify-center left-8 top-[50%] translate-y-[-50%] bg-white group hidden md:flex"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            aria-label="next-button"
            className="absolute w-11 h-11 rounded-full items-center justify-center right-8 top-[50%] translate-y-[-50%] bg-white group hidden md:flex"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>

        <div className="w-full absolute top-[90%] left-0 right-0 flex items-center justify-center gap-3">
          {Dots}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
