import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import { DotButton, useDotButton } from "./CarouselDotButtons";
import { client, urlFor } from "@/utils/Client";
import { SANITY_SLIDES_QUERY } from "@/utils/Data";
import "./css/base.css";
import "./css/embla.css";
import { slideType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import NoInternet from "@/components/noInternet";
import { LazyLoadImage } from "./CarouselLazyLoading";

const EmblaCarousel: React.FC = () => {
  const [slides, setSlides] = useState<slideType[]>([]);
  const [filteredSlides, setFilteredSlides] = useState<slideType[]>([]);
  const [slidesError, setSlidesError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const { toast } = useToast();

  const updateScreenSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    client
      .fetch(SANITY_SLIDES_QUERY)
      .then((data) => setSlides(data))
      .catch((err) => setSlidesError(err.message));
  }, []);

  useEffect(() => {
    const filtered = slides.filter(
      (item) =>
        (isMobile && item?.media === "mobile") ||
        (!isMobile && item?.media === "desktop")
    );
    setFilteredSlides(filtered);
  }, [slides, isMobile]);

  useEffect(() => {
    if (slidesError) {
      toast({
        title: "Check internet connection!",
        description: "Try to check your internet and then refresh the page!",
        variant: "destructive",
      });
    }
  }, [slidesError]);

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

  const PlaceholderSlide = () => (
    <div className="embla__slide flex justify-center items-center bg-gray-200">
      <div
        className="w-full h-full bg-gray-300 animate-pulse"
        style={{
          aspectRatio: isMobile ? "16 / 9" : "3 / 1",
        }}
      ></div>
    </div>
  );

  const Slides = filteredSlides.map((item, index) => {
    const image = `${urlFor(item?.images?.asset?._ref)}`;
    return (
      <div
        key={index}
        className="embla__slide flex justify-center items-center"
        style={{
          aspectRatio: isMobile ? "16 / 9" : "3 / 1",
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

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

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

  if (slidesError) {
    return <NoInternet />;
  }

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {Slides.length > 0
            ? Slides
            : Array.from({ length: 3 }).map((_, i) => (
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
