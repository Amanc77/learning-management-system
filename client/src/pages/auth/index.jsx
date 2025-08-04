import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <>
      <div className=" flex flex-col min-h-screen bg-gray-900">
        <header className=" px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            <GraduationCap className="inline-block w-6 h-6 mr-2" />
            <span className="font-extrabold text-xl"> LMS Learn</span>
          </Link>
        </header>
        <div className=" flex items-center justify-center max-h-screen">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-md"
          >
            <TabsList className="bg-gray-800 text-gray-300">
              <TabsTrigger value="login" className="w-1/2">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="w-1/2">
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="p-4 bg-gray-800">
              {/* Login Form Component */}
              <p className="text-gray-300">Login </p>
            </TabsContent>
            <TabsContent value="register" className="p-4 bg-gray-800">
              {/* Register Form Component */}
              <p className="text-gray-300">Register</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
