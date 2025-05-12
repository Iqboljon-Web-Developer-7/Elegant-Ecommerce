import React, { ErrorInfo, ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Link, useLocation } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const location = useLocation();

  return (
    <div className="errorBoundaryContainer">
      <div className="flex flex-col items-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h4 className="text-3xl font-semibold text-gray-900 mb-2">
          Something went wrong
        </h4>
        <p className="text-gray-500 mb-6 max-w-md">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <p className="text-sm text-red-400 font-mono mb-6">{error?.message}</p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              resetErrorBoundary();
              window.location.reload();
            }}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Try Again
          </button>
          {location.pathname !== "/" && (
            <Link
              to="/"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Go to Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const AppErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
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
