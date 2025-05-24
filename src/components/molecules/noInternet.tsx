import { useCallback } from "react";

const NoInternet: React.FC<{ className?: string }> = ({ className }) => {
  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[200px] bg-gray-100 rounded-md shadow-md ${className}`}
    >
      <p className="text-lg font-semibold text-gray-700 mb-4">
        Unable to connect to the internet.
      </p>
      <button
        onClick={handleRefresh}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
      >
        Refresh
      </button>
    </div>
  );
};

export default NoInternet;
