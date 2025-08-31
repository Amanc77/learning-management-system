import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1 bg-gray-800 p-4 sm:p-8 text-white rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="font-bold text-xl">Edit Course Information</h1>
        <Link to="lecture">
          <Button variant="link" className="text-blue-400 hover:text-blue-500">
            Go to lectures page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
