import React from "react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  const [user, setUser] = useState(false);
  return (
    <div className=" bg-gray-900 w-full  justify-between  px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
      {/* logo */}
      <div className=" flex items-center text-white gap-2">
        <GraduationCap className=" w-10 h-10" />
        <h1 className=" text-2xl font-bold">LMS</h1>
      </div>

      {/* nav icons */}
      <div className=" text-white text-xl font-medium">
        <nav className="">
          <ul className=" flex items-center gap-4">
            <Link to="/" className=" hover:text-blue-500 transition-colors">
              {" "}
              <li>Home</li>
            </Link>
            <Link
              to="/courses"
              className=" hover:text-blue-500 transition-colors"
            >
              {" "}
              <li>Courses</li>
            </Link>
            {!user ? (
              <div className=" flex gap-3">
                <Button className=" bg-blue-500 hover:bg-blue-600 text-white">
                  <Link to="/Login">Login</Link>
                </Button>
                <Button className=" bg-gray-500 hover:bg-gray-600 ">
                  <Link to="/Signup">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <div className=" flex items-center gap-3 ">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button className=" bg-red-500 hover:bg-red-600 text-white ml-2">
                  Logout
                </Button>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
