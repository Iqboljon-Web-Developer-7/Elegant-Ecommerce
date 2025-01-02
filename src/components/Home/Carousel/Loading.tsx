const PlaceholderSlide = () => (
  <div className="embla__slide flex justify-center items-center">
    <div
      className="w-full h-full bg-sky-50"
      style={{
        aspectRatio: window.innerWidth <= 768 ? "16 / 9" : "3 / 1",
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

export default PlaceholderSlide;
