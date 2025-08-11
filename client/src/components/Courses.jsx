import React from "react";
import { courses } from "./courseContent";
import { Card } from "./ui/card";
import CourseCard from "./CourseCard";

function Courses() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-white mt-10">
        Courses Page
      </h1>

      <p className="text-center text-gray-400 mt-4">
        This is where you can browse and enroll in courses.
      </p>
      <div className=" w-[1300px] mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {courses.map((courses, index) => {
          return <CourseCard course={courses} />;
        })}
      </div>
    </div>
  );
}

export default Courses;
