import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { LazyLoadImage } from "./CarouselLazyLoading";
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

const EmblaCarousel: React.FC = () => {
  const [slides, setSLIDES] = useState<slideType[]>([]);
  const [slidesError, setSlidesError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    client
      .fetch(SANITY_SLIDES_QUERY)
      .then((data) => setSLIDES(data))
      .catch((err) => setSlidesError(err));
  }, []);

  useEffect(() => {
    if (slidesError) {
      toast({
        title: "Check internet connection!",
        description: "try to check your internet and then refresh the page!",
        variant: "destructive",
      });
    }
  }, [slidesError]);

  const [emblaRed, emblaApi] = useEmblaCarousel();
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

  if (slidesError) {
    return <NoInternet />;
  }

  const Slides = slides?.map((item, index) => (
    <LazyLoadImage
      key={index}
      index={index}
      imgSrc={`${urlFor(item?.images?.asset?._ref)}`}
      inView={slidesInView.indexOf(index) > -1}
    />
  ));
  const Dots = scrollSnaps.map((_, index) => (
    <DotButton
      key={index}
      onClick={() => onDotButtonClick(index)}
      className={"w-3 h-3 rounded-full bg-white transition-all".concat(
        index === selectedIndex ? " !w-10" : ""
      )}
    />
  ));

  return (
    <div className="embla relative">
      {!slides[0]?.images ? (
        <div className="min-h-[31.8rem] bg-black w-full flex-center rounded-sm">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="embla__viewport" ref={emblaRed}>
            <div className="embla__container">{Slides && Slides}</div>
          </div>
          <div className="embla__controls">
            <div className="embla__buttons">
              <PrevButton
                className="absolute w-14 h-14 rounded-full items-center justify-center left-8 top-[50%] translate-y-[-50%] bg-white group hidden md:flex"
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                className="absolute w-14 h-14 rounded-full items-center justify-center right-8 top-[50%] translate-y-[-50%] bg-white group hidden md:flex"
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>

            <div className="w-full absolute bottom-12 left-0 right-0 flex items-center justify-center gap-3">
              {Dots}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmblaCarousel;
