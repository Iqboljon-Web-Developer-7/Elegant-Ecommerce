import React, { ErrorInfo, ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Link, useLocation } from "react-router-dom";

const ErrorIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-red-500 mb-4"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const location = useLocation();

  return (
    <div className="errorBoundaryContainer">
      <div className="flex flex-col items-center">
        <ErrorIcon />
        <h4 className="font-semibold text-gray-900 mb-2">
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
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer"
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
