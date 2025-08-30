import React from "react";
import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

function PageNotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center text-gray-200 p-6">
      <div className="bg-gray-800 p-6 rounded-full shadow-lg">
        <Ghost size={80} className="text-red-400 animate-bounce" />
      </div>

      <h1 className="mt-6 text-6xl font-bold text-white">404</h1>
      <p className="mt-2 text-lg text-gray-400">
        Oops! The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-200 shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
