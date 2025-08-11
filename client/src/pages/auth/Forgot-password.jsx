import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 w-full max-w-md rounded-lg shadow-lg p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Forgot Password
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Enter your registered email address and we’ll send you a reset link.
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <Label className="text-gray-300">Email Address</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-gray-700 text-gray-200 mt-1"
          />
        </div>

        {/* Submit Button */}
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
          Send Reset Link
        </Button>

        {/* Back to Login */}
        <p className="text-center text-gray-400 mt-4">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
