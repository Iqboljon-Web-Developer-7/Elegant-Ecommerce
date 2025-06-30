export default function ProductLoading() {
  return (
    <div className="mb-15 flex items-center gap-6 overflow-x-auto">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="min-w-72 p-3 flex flex-col flex-grow items-start flex-shrink-0 rounded-lg shadow-md animate-pulse"
        >
          <div className="w-full h-64 bg-gray-200 rounded-md"></div>
          <div className="w-12 h-6 bg-gray-200 mt-3 rounded"></div>
          <div className="flex gap-1 mt-2">
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          </div>
          <div className="w-3/4 h-6 bg-gray-200 mt-3 rounded"></div>
          <div className="w-1/2 h-5 bg-gray-200 mt-2 rounded"></div>
        </div>
      ))}
    </div>
  );
}
