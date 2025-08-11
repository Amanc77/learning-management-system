import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../../components/Navbar";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <>
      <div className=" flex flex-col min-h-screen bg-gray-900">
        <header className="">
          <Navbar />
        </header>
        <div className=" flex items-center justify-center w-full h-full max-h-screen">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className=" bg-gray-800 flex justify-center items-center h-full  shadow-lg rounded-lg flex-col"
          >
            <TabsList className="bg-gray-700  text-white flex  w-[300px] justify-center p-2 rounded-t-lg  h-full">
              <TabsTrigger value="login" className="w-1/2 text-2xl font-bold">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="w-1/2 text-2xl font-bold">
                signup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signup" className="p-4 bg-gray-800">
              {/* signup Form Component */}
              <div className=" text-white">
                <h1 className=" text-2xl font-bold text-center mb-4 text-gray-200">
                  Create Your Account
                </h1>
                <p className=" text-center text-gray-400 mb-8 ">
                  Join us today! It's quick and easy
                </p>
                {/* name input */}
                <div>
                  <Label className="p-1">Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className=" bg-gray-700 text-gray-200 mb-4"
                  />
                </div>
                <div>
                  <Label className="p-1">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className=" bg-gray-700 text-gray-200 mb-4"
                  />
                </div>
                <div>
                  <Label className="p-1">Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className=" bg-gray-700 text-gray-200 mb-4"
                  />
                </div>

                <div>
                  <Label className="p-4">Role</Label>
                  <RadioGroup className="flex gap-4" defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Instructor</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <Button className=" bg-blue-500 hover:bg-blue-600 text-white w-full mt-4">
                Sign Up
              </Button>
              <p className=" text-center text-gray-400 mt-4">
                Already have an account?{" "}
                <Link to="/auth" className=" text-blue-400 hover:underline">
                  Login here
                </Link>
              </p>
            </TabsContent>
            <TabsContent value="login" className="p-4 bg-gray-800">
              {/* Login Form Component */}
              <p className="text-gray-300">Login </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
