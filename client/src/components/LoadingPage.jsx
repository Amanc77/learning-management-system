import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-900">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-300 mb-6"></div>
        {/* Loading text */}
        <p className="text-4xl text-gray-300">Loading courses...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
