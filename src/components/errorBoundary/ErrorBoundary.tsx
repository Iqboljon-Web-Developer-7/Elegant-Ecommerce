import React, { ErrorInfo, ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Link } from "react-router-dom";

// Fallback UI Component
const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h4 className="text-2xl font-bold text-gray-800 mb-4">
        Oops! Something went wrong.
      </h4>
      <p className="text-red-500 mb-4">{error?.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mb-4"
      >
        Try Again
      </button>
      <Link to="/" className="text-blue-500 hover:underline transition-colors">
        Go back to Home
      </Link>
    </div>
  );
};

interface AppErrorBoundaryProps {
  children: ReactNode;
}

const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({ children }) => {
  const handleError = (error: Error, info: ErrorInfo) => {
    console.error("Error caught by ErrorBoundary:", error, info);
  };

  const resetErrorBoundary = () => {
    console.log("Error boundary reset");
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={resetErrorBoundary}
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;
