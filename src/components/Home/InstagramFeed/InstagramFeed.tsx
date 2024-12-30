const InstagramFeed = () => {
  const images = [
    "https://picsum.photos/262/261",
    "https://picsum.photos/262/262",
    "https://picsum.photos/262/263",
    "https://picsum.photos/262/264",
  ];

  return (
    <div className="bg-white py-12 px-6">
      <div className="text-center mb-10 flex flex-col gap-4">
        <p className="inter font-semibold text-neutral-400 tracking-wide uppercase">
          Newsfeed
        </p>
        <h4 className="fs-40 font-normal text-gray-800">Instagram</h4>
        <p className="inter text-neutral-900 mt-2 fs-20">
          Follow us on social media for more discounts & promotions
        </p>
        <p className="fs-20 text-neutral-400 font-medium mt-1">
          @3legant_official
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden hover:shadow-md duration-200"
          >
            <img
              src={image}
              alt={`Instagram Post ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;
