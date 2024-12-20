const SimpleHeading = () => {
  return (
    <div className="m-3 flex items-start sm:items-center justify-between flex-col lg:flex-row text-left sm:text-center lg:text-left gap-3">
      <h1 className="text-4xl lg:text-7xl font-medium tracking-tighter sm:w-[14ch]">
        Simply Unique/ Simply Better.
      </h1>
      <p className="text-sm sm:text-base text-grey-500 max-w-[27rem]">
        <strong className="text-black">3legant</strong> is a gift & decorations
        store based in HCMC, Vietnam. Est since 2019.{" "}
      </p>
    </div>
  );
};

export default SimpleHeading;
