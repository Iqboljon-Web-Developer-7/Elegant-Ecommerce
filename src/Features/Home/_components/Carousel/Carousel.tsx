import { useCallback, useEffect, useMemo, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import { DotButton, useDotButton } from "./CarouselDotButtons";

import "./css/embla.css";
import { SlideType } from "@/lib/types";

import { LazyLoadImage } from "./CarouselLazyLoading";
import PlaceholderSlide from "./Loading";
import { client, urlFor } from "@/utils/Client";
import { SANITY_SLIDES_QUERY } from "@/utils/Data";

const HomeCarousel = () => {
  const [slides, setSlides] = useState<SlideType[]>([]);

  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const windowWidth = window.innerWidth;

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView(emblaApi.slidesInView());
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  console.log("re-rendering");

  const Slides = useMemo(
    () =>
      slides
        ?.filter((item) =>
          windowWidth < 768
            ? item?.media === "mobile"
            : item?.media === "desktop"
        )
        .map((item, index) => (
          <div key={index} className="embla__slide flex-center">
            <LazyLoadImage
              index={index}
              imgSrc={urlFor(item?.images.asset._ref).url()}
              inView={slidesInView.includes(index)}
            />
          </div>
        )),
    [slides, slidesInView]
  );

  const Dots = useMemo(
    () =>
      scrollSnaps.map((_, index) => (
        <DotButton
          aria-label={`indicator button ${index + 1}`}
          key={index}
          onClick={() => onDotButtonClick(index)}
          className={"w-3 h-3 rounded-full bg-white transition-all shadow shadow-slate-400 hover:cursor-pointer".concat(
            index === selectedIndex ? " !w-10" : ""
          )}
        />
      )),
    [slidesInView]
  );

  useEffect(() => {
    if (!emblaApi) return;
    updateSlidesInView(emblaApi);
    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const data = await client.fetch(SANITY_SLIDES_QUERY);
        setSlides(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    }
    fetchSlides();
  }, []);

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {!Slides.length ? <PlaceholderSlide /> : Slides}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          {Slides.length ? (
            <PrevButton
              aria-label="prev-button"
              className="carouselBtn left-8 group"
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          ) : null}
          {Slides.length ? (
            <NextButton
              aria-label="next-button"
              className="carouselBtn right-8 group"
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          ) : null}
        </div>

        <div className="w-full absolute top-[90%] left-0 right-0 flex-center gap-3">
          {Slides.length ? Dots : null}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
