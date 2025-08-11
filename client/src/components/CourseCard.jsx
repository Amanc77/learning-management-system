import React from "react";
import { Card } from "./ui/card";

function CourseCard({ course }) {
  return (
    <Card className="bg-gray-800 text-white p-2 hover:bg-gray-700 transition-colors rounded-lg shadow-md">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-3">{course.title}</h2>
      <p className="text-gray-400 mt-1">{course.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-blue-500 font-bold">
          {course.price ? `$${course.price}` : "Free"}
        </span>
        <span className="text-sm text-gray-400">{course.instructor}</span>
      </div>

      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors">
        Enroll Now
      </button>
    </Card>
  );
}

export default CourseCard;
