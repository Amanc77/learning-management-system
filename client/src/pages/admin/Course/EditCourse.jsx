import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CourseTab from "./CourseTab";
import BackButton from "../../../components/BackButton";

const EditCourse = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="font-bold text-2xl sm:text-3xl">
              Edit Course Information
            </h1>
          </div>

          <Link to="lecture">
            <Button
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Go to Lectures Page
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800  ">
          <CourseTab />
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
