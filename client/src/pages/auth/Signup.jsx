import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { toast } from "sonner";

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
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
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

        {/* Full Name */}
        <div className="mb-4">
          <Label className="text-gray-300">Full Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={user.name}
            placeholder="Enter your full name"
            className="bg-gray-700 text-gray-200 mt-1"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <Label className="text-gray-300">Email Address</Label>
          <Input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={user.email}
            placeholder="Enter your email"
            className="bg-gray-700 text-gray-200 mt-1"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <Label className="text-gray-300">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={user.password}
            placeholder="Enter your password"
            className="bg-gray-700 text-gray-200 mt-1"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <Label className="text-gray-300 mb-2">Role</Label>
          <RadioGroup
            onChange={handleChange}
            className="flex gap-6 mt-1"
            defaultValue={user.role}
          >
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                id="role1"
                value="student"
                onChange={handleChange}
                checked={user.role === "student"}
              />
              <Label htmlFor="role" className="text-gray-200">
                Student
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                id="role2"
                value="instructor"
                onChange={handleChange}
                checked={user.role === "instructor"}
              />
              <Label htmlFor="role2" className="text-gray-200">
                Instructor
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Sign Up
        </Button>

        {/* Footer */}
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
