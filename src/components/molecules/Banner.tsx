import { FC } from "react";

interface BannerTypes {
  img: string;
  className?: string;
  children: React.ReactNode;
}

import { useInView } from "react-intersection-observer";

const Banner: FC<BannerTypes> = ({ img, className, children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`flex items-center bg-neutral-200 gap-[6%] flex-col md:flex-row ${className}`}
    >
      <div className="w-full md:w-1/2">
        <img
          src={inView ? img : ""}
          alt="Person wearing a red winter jacket"
          className="w-full h-auto object-cover aspect-[4/3]"
          loading="lazy"
        />
      </div>

      <div className="w-full grid gap-2 sm:gap-3 md:w-1/2 ps-3 py-12 sm:p-10 md:p-0">
        {children}
      </div>
    </div>
  );
};

export default Banner;
