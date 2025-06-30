const InfoLoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-5 p-4 w-full">
      <div className="h-6 bg-neutral-300 dark:bg-neutral-700 rounded w-3/4"></div>
      <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-1/2"></div>
      <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded w-1/4"></div>
      <div className="h-10 bg-neutral-300 dark:bg-neutral-700 rounded w-1/2"></div>
      <div className="h-48 bg-neutral-300 dark:bg-neutral-700 rounded w-full"></div>
      <div className="space-y-2">
        <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default InfoLoadingSkeleton;
