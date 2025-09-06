import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Menu,
  X,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth || {});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef();

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setPanelOpen(false);
    }
    function onClick(e) {
      if (
        panelOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        setPanelOpen(false);
      }
    }
    if (panelOpen) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [panelOpen]);

  const logoutHandler = async () => {
    try {
      const res = await axiosInstance.get("/user/logout", {
        withCredentials: true,
      });
      if (res.data?.success) {
        dispatch(setUser(null));
        toast.success(res.data.message || "Logged out");
        setPanelOpen(false);
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  };

  const dashboardLink =
    user?.role === "instructor" ? "/admin/dashboard" : "/my-learning";

  const handleToggle = () => {
    if (user) {
      setPanelOpen((p) => !p);
    } else {
      setMobileOpen((p) => !p);
    }
  };

  const isOpen = user ? panelOpen : mobileOpen;

  return (
    <header className="bg-gray-900 w-full border-b border-gray-800 shadow-md">
      <div className="mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-13">
        <Link to="/" className="flex items-center text-white gap-2">
          <GraduationCap className="w-10 h-10 sm:w-10 sm:h-10" />
          <h1 className="text-xl sm:text-2xl font-bold">LMS</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-white text-lg font-semibold">
          {user ? (
            <>
              <Link
                to="/"
                className="hover:text-blue-400 transition-colors py-2"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="hover:text-blue-400 transition-colors py-2"
              >
                Courses
              </Link>
              <Link
                to={dashboardLink}
                className="hover:text-blue-400 transition-colors py-2"
              >
                Dashboard
              </Link>
              <button
                onClick={() => setPanelOpen(true)}
                className="ml-4 focus:outline-none"
              >
                <img
                  src={user?.photoUrl || "https://github.com/shadcn.png"}
                  alt={user?.name || "User"}
                  className="w-11 h-11 rounded-full border-2 border-white hover:border-blue-400 transition"
                />
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hover:text-blue-400 py-2">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-400 py-2">
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={handleToggle}
          className="md:hidden text-gray-200 focus:outline-none p-2 hover:bg-gray-800 rounded"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu for non-logged-in users */}
      {mobileOpen && !user && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-3">
          <Link
            onClick={() => setMobileOpen(false)}
            to="/login"
            className="block py-3 text-gray-200 hover:text-white border-b border-gray-800"
          >
            Login
          </Link>
          <Link
            onClick={() => setMobileOpen(false)}
            to="/signup"
            className="block py-3 text-gray-200 hover:text-white border-b border-gray-800"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Account Side Panel */}
      {user && (
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-lg z-50 transform transition-transform duration-300 ${
            panelOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!panelOpen}
        >
          <div ref={panelRef} className="h-full flex flex-col">
            <div className="flex items-start justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <Link to="/profile">
                  <img
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt={user?.name || "User"}
                    className="w-12 h-12 rounded-full border border-gray-700"
                    onClick={() => setPanelOpen(false)}
                  />
                </Link>
                <div>
                  <div className="font-semibold text-white">
                    {user?.name || "Guest"}
                  </div>
                  <div className="text-sm text-gray-400">
                    {user?.email || ""}
                  </div>
                  <div className="text-xs mt-1 inline-flex items-center gap-2 text-blue-400">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400" />
                    <span>
                      {user?.role === "instructor" ? "Instructor" : "Student"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPanelOpen(false)}
                className="p-2 rounded-full hover:bg-gray-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 space-y-2 flex-1 overflow-auto">
              <Link
                to="/"
                onClick={() => setPanelOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800"
              >
                <BookOpen size={18} />
                <span>Home</span>
              </Link>
              <Link
                to="/courses"
                onClick={() => setPanelOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800"
              >
                <BookOpen size={18} />
                <span>Courses</span>
              </Link>
              <Link
                to={dashboardLink}
                onClick={() => setPanelOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800"
              >
                <BookOpen size={18} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/profile"
                onClick={() => setPanelOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800"
              >
                <Settings size={18} />
                <span>Account Settings</span>
              </Link>
            </div>

            <div className="p-4 border-t border-gray-800">
              <button
                onClick={logoutHandler}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
