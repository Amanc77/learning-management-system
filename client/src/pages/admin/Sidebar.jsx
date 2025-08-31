import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-56 sm:w-72 p-4 border-r border-gray-700">
        <div className="space-y-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 hover:text-blue-400"
          >
            <ChartNoAxesColumn size={24} />
            <span className="font-semibold">Dashboard</span>
          </Link>
          <Link
            to="/admin/courses"
            className="flex items-center gap-3 hover:text-blue-400"
          >
            <SquareLibrary size={24} />
            <span className="font-semibold">Courses</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-800 p-4 sm:p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
