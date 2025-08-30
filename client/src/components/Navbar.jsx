import React, { useState, useRef, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        setDropdownOpen(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header className="bg-gray-900 w-full border-b border-gray-800">
      <div className=" mx-2 flex justify-between items-center px-2 h-14 lg:justify-between ">
        {/* Logo */}
        <Link to="/" className="flex items-center text-white gap-2 mx-2">
          <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />
          <h1 className="text-xl sm:text-2xl font-bold">LMS</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-white text-lg font-bold">
          <Link to="/" className="hover:text-blue-500 transition-colors">
            Home
          </Link>
          <Link to="/courses" className="hover:text-blue-500 transition-colors">
            Courses
          </Link>

          {user ? (
            <div
              className="relative flex items-center gap-3 mx-2"
              ref={dropdownRef}
            >
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="focus:outline-none"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={user.photoUrl || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 rounded-xl shadow-2xl bg-gray-700 text-white py-3 px-2 flex flex-col gap-2 z-50">
                  <Link
                    to="/my-learning"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    My Learning
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block px-4 py-2 rounded-lg mt-1 bg-red-600 hover:bg-red-700 text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600 text-white">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none mx-2"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-4 space-y-4">
          <Link
            to="/"
            className="block hover:text-blue-500 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="block hover:text-blue-500 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Courses
          </Link>

          {user ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/my-learning"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                My Learning
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="w-full text-left px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600 text-white w-full">
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
