import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Login to continue learning
        </p>

        {/* Email */}
        <div className="mb-4">
          <Label className="text-gray-300">Email Address</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-gray-700 text-gray-200 mt-1"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <Label className="text-gray-300">Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            className="bg-gray-700 text-gray-200 mt-1"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-4">
          <Link
            to="/forgot-password"
            className="text-blue-400 hover:underline text-sm"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
          Login
        </Button>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
