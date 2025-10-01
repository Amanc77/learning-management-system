import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
          <div className="absolute inset-0 rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-300 blur-sm opacity-70 animate-pulse"></div>
        </div>

        <p className="text-3xl font-semibold text-gray-200 animate-pulse tracking-wide">
          Loading...
        </p>

        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></span>
          <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-400"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
