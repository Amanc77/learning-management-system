import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-900 text-white flex-col md:flex-row">
      {/* Mobile Top Buttons */}
      <div className="flex md:hidden justify-around bg-gray-820/85 border-b border-gray-700 p-2">
        <Link
          to="/admin/dashboard"
          onClick={() => setActive("dashboard")}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            active === "dashboard" ? "bg-blue-600" : "hover:bg-gray-700"
          }`}
        >
          <ChartNoAxesColumn size={20} />
          <span className="text-sm font-semibold">Dashboard</span>
        </Link>
        <Link
          to="/admin/courses"
          onClick={() => setActive("courses")}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            active === "courses" ? "bg-blue-600" : "hover:bg-gray-700"
          }`}
        >
          <SquareLibrary size={20} />
          <span className="text-sm font-semibold">Courses</span>
        </Link>
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:flex-col w-56 sm:w-72 p-4 bg-gray-820/85 border-r border-gray-700">
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

      {/* Main Content */}
      <div className="flex-1 bg-gray-800">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
