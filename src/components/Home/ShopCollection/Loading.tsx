const Loading = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      <div className="animate-pulse space-y-4">
        <div className="w-full aspect-square bg-gray-300 rounded-lg"></div>
        <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
      </div>

      <div className="animate-pulse space-y-4">
        <div className="w-full aspect-square bg-gray-300 rounded-lg"></div>
        <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
      </div>

      <div className="animate-pulse space-y-4">
        <div className="w-full aspect-square bg-gray-300 rounded-lg"></div>
        <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default Loading;
