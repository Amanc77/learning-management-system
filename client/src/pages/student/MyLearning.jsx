import React from "react";
import CourseCard from "./CourseCard";
import { courses } from "./courseContent";

function MyLearning() {
  let myCourses = courses;
  // myCourses = [];

  return (
    <div className=" min-h-screen bg-[#10111a] px-4 sm:px-6 lg:px-8">
      <h2 className=" pt-5 text-3xl text-white font-bold mb-1 text-center">
        My Learning
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        Your enrolled courses appear below:
      </p>

      {myCourses.length === 0 ? (
        <h3 className="text-center text-lg text-gray-400 py-10">
          You are not enrolled in any courses.
        </h3>
      ) : (
        <div className="max-w-[1250px] mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          {myCourses.map((course, idx) => (
            <CourseCard key={course.id || idx} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLearning;
