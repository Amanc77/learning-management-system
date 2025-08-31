import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axiosInstance from "@/utils/axiosInstance";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axiosInstance.post("/user/register", {
        ...user,
        name: user.name.trim(),
        email: user.email.trim(),
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "Server error. Try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Create Your Account
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Join us today! It's quick and easy
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <Label className="text-gray-300">Full Name</Label>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={user.name}
              placeholder="Enter your full name"
              className="bg-gray-700 text-gray-200 mt-1"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label className="text-gray-300">Email Address</Label>
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              value={user.email}
              placeholder="Enter your email"
              className="bg-gray-700 text-gray-200 mt-1"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="text-gray-300">Password</Label>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="Enter your password"
              className="bg-gray-700 text-gray-200 mt-1"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <Label className="text-gray-300 mb-2">Role</Label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  onChange={handleChange}
                  checked={user.role === "student"}
                />
                <span className="text-gray-200">Student</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  onChange={handleChange}
                  checked={user.role === "instructor"}
                />
                <span className="text-gray-200">Instructor</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Sign Up
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
