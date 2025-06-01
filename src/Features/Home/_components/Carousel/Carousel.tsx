import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./css/embla.css";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import { DotButton, useDotButton } from "./CarouselDotButtons";
import { useSlides } from "@/hooks/Home/Carousel/useSlides";
import { urlFor } from "@/utils/Client";
import { LazyLoadImage } from "./CarouselLazyLoading";
import { EmblaCarouselType } from "embla-carousel";
import PlaceholderSlide from "./Loading";

const HomeCarousel = () => {
  const { data: slides = [], isLoading, isError } = useSlides();
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const windowWidth = window.innerWidth;

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

  useEffect(() => {
    if (!emblaApi) return;
    updateSlidesInView(emblaApi);
    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  const filteredSlides = useMemo(
    () =>
      slides.filter((item) =>
        windowWidth < 768 ? item?.media === "mobile" : item?.media === "desktop"
      ),
    [slides, windowWidth]
  );

  const Slides = useMemo(
    () =>
      filteredSlides.map((item, index) => (
        <div key={index} className="embla__slide flex-center">
          <LazyLoadImage
            index={index}
            imgSrc={urlFor(item?.images.asset._ref).url()}
            inView={slidesInView.includes(index)}
          />
        </div>
      )),
    [filteredSlides, slidesInView]
  );

  const Dots = useMemo(
    () =>
      scrollSnaps.map((_, index) => (
        <DotButton
          aria-label={`indicator button ${index + 1}`}
          key={index}
          onClick={() => onDotButtonClick(index)}
          className={`w-3 h-3 rounded-full bg-white transition-all shadow shadow-slate-400 hover:cursor-pointer${
            index === selectedIndex ? " !w-10" : ""
          }`}
        />
      )),
    [scrollSnaps, selectedIndex, onDotButtonClick]
  );

  if (isLoading) return <PlaceholderSlide />;
  if (isError) return <div>Error loading slides.</div>;

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{Slides}</div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            aria-label="prev-button"
            className="carouselBtn left-8 group"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            aria-label="next-button"
            className="carouselBtn right-8 group"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>
        <div className="w-full absolute top-[90%] left-0 right-0 flex-center gap-3">
          {Dots}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
