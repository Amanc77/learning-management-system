import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex min-h-screen  bg-gray-600 text-white">
      <div className="w-[250px] sm:w-[300px] p-2">
        <div className="m-2">
          <Link to={"/admin/dashboard"} className="flex items-center gap-2.5">
            <ChartNoAxesColumn size={28} />
            <h1 className=" text-xl font-bold">Dashboard</h1>
          </Link>
        </div>
        <div className="m-2">
          <Link to={"/admin/courses"} className="flex items-center gap-2.5">
            <SquareLibrary size={28} />
            <h1 className=" text-xl font-bold">Course</h1>
          </Link>
        </div>
      </div>

      <div className="flex-1 pt-12 pl-10 bg-gray-700 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
