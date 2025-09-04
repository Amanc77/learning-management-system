import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";

const CourseDetails = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header */}
      <div className="bg-gray-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-3">
          <h1 className="font-extrabold text-2xl md:text-4xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Full Stack Web Development Bootcamp
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            Learn MERN stack from scratch to advanced.
          </p>
          <p>
            Created By{" "}
            <span className="text-indigo-400 underline italic hover:text-indigo-300 transition">
              Aman Sharma
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <BadgeInfo size={16} />
            <p>Last updated 2025-09-04</p>
          </div>
          <p className="text-gray-400">Students enrolled: 120</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 md:px-8 flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            Description
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            This course will teach you how to build modern full-stack web
            applications using MongoDB, Express, React, and Node.js. You will
            learn both frontend and backend development, deployment, and real
            project workflows.
          </p>

          <Card className="bg-gray-800 border border-gray-700 text-gray-200 rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-white">Course Content</CardTitle>
              <CardDescription className="text-gray-400">
                4 lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Introduction to Web Development",
                "Getting Started with React",
                "Backend with Node & Express",
                "Database with MongoDB",
              ].map((lecture, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-gray-700 transition"
                >
                  <span>
                    {idx === 0 ? (
                      <PlayCircle size={16} className="text-indigo-400" />
                    ) : (
                      <Lock size={16} className="text-gray-500" />
                    )}
                  </span>
                  <p>{lecture}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Section (Sticky Video Preview) */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-6 h-fit">
          <Card className="bg-gray-800 border border-gray-700 text-gray-200 rounded-2xl shadow-lg">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden shadow-md">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  controls={true}
                />
              </div>
              <h1 className="text-lg font-semibold text-white">
                Lecture Preview
              </h1>
              <Separator className="my-2 bg-gray-700" />
              <h1 className="text-lg md:text-xl font-semibold text-white">
                Course Price
              </h1>
              <p className="text-indigo-400 font-bold text-2xl mt-1">₹499</p>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold text-lg">
                Buy Course
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
