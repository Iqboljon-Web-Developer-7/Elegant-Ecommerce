import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./styles.css";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import { DotButton, useDotButton } from "./CarouselDotButtons";
import { LazyLoadImage } from "./CarouselLazyLoading";
import PlaceholderSlide from "./Loading";
import { useSlides } from "@/Features/Home/hook/Carousel/useSlides";
import { urlFor } from "@/utils/Client";
import { EmblaCarouselType } from "embla-carousel";
import { useToast } from "@/hooks/use-toast";

const HomeCarousel = () => {
  const { data: slides = [], isLoading, isError } = useSlides();

  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const windowWidth = window.innerWidth;

  const { toast } = useToast();

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
            imgSrc={urlFor(item?.images.asset._ref).width(1300).url()}
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

  
  useEffect(() => {
    if (!emblaApi) return;
    updateSlidesInView(emblaApi);
    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);


  if (isLoading) return <PlaceholderSlide />;
  if (isError) {
    toast({
      title: "Error",
      description: "Failed to load carousel slides. Please try again later.",
      variant: "destructive",
    });
    
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Unable to load carousel</h3>
            <p className="text-sm text-gray-500 mt-1">Something went wrong while loading the slides.</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {Slides.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-4 mx-auto">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">No slides available</h3>
                <p className="text-sm text-gray-500 mt-1">There are currently no slides to display.</p>
              </div>
            </div>
          ) : (
            Slides
          )}
        </div>
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
