import React from "react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  const [user, setUser] = useState(false);
  return (
    <div className=" bg-gray-900 w-full h-16 flex items-center justify-between px-4">
      {/* logo */}
      <div className=" flex items-center text-white gap-2">
        <GraduationCap className=" w-10 h-10" />
        <h1 className=" text-2xl font-bold">LMS</h1>
      </div>

      {/* nav icons */}
      <div className=" text-white text-xl font-medium">
        <nav className="">
          <ul className=" flex items-center gap-4">
            <li>Home</li>
            <li>Courses</li>
            {!user ? (
              <div className=" flex gap-3">
                <Button className=" bg-blue-500 hover:bg-blue-600 text-white">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button className=" bg-gray-500 hover:bg-gray-600 ">
                  <Link to="/auth">Sign Up</Link>
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
