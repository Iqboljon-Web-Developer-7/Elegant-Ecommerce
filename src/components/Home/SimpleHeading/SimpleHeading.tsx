const SimpleHeading = () => {
  return (
    <div className="pt-4 md:pt-8 px-[1%] flex items-start sm:items-center justify-between flex-col sm:flex-row text-left lg:text-left gap-3">
      <h2 className="leading-9 sm:leading-[2.75rem] tracking-[-0.025rem] text-[2.2rem] md:text-6xl lg:text-7xl font-medium sm:w-[14ch] flex-shrink-0">
        Simply Unique<span className="text-neutral-400">/</span> Simply Better
        <span className="text-neutral-400">.</span>
      </h2>
      <p className="max-w-[27rem] text-sm lg:text-base text-grey-500 flex-grow">
        <strong className="text-black">3legant</strong> is a gift & decorations
        store based in HCMC, Vietnam. Est since 2019.{" "}
      </p>
    </div>
  );
};

export default SimpleHeading;
