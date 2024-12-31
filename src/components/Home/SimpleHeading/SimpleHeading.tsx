const SimpleHeading = () => {
  return (
    <div className="w-full px-[1%] pt-4 md:pt-8 flex items-start sm:items-center justify-between flex-col sm:flex-row text-left lg:text-left gap-3">
      <h2 className="w-full sm:w-[14ch] flex-shrink-0 text-[2.2rem] md:text-6xl lg:text-7xl leading-9 md:leading-[auto] tracking-[-0.025rem] font-medium">
        Simply Unique<span className="text-neutral-400">/</span> Simply Better
        <span className="text-neutral-400">.</span>
      </h2>
      <p className="w-full max-w-[27rem] text-sm lg:text-base text-grey-500 flex-grow">
        <strong className="text-black">3legant</strong> is a gift & decorations
        store based in HCMC, Vietnam. Est since 2019.{" "}
      </p>
    </div>
  );
};

export default SimpleHeading;
