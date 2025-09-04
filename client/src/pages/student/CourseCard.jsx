import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  console.log(course);
  return (
    <Link to={`/course-detail/${course.id}`}>
      <Card className="overflow-hidden rounded-xl bg-gray-800 border border-gray-800 hover:shadow-2xl hover:scale-[1.04] transition-all duration-300 p-0 pb-5">
        <div className="relative w-full h-56 overflow-hidden rounded-t-xl border-b border-gray-700">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="absolute  w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <CardContent className=" space-y-2">
          <h1 className="hover:underline font-bold text-white text-lg truncate">
            {course.courseTitle}
          </h1>
          <p className="text-gray-400 text-sm truncate">{course.description}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-gray-700">
                <AvatarImage
                  src={course.creator.photoUrl}
                  alt={`instructorURl`}
                />
              </Avatar>
              <h1 className="font-medium text-gray-300 text-base">
                {course.creator.name}
              </h1>
            </div>
            <Badge className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full shadow">
              {course.courseLevel ? course.courseLevel : "Beginner"}
            </Badge>
          </div>
          <div className=" flex justify-between text-xl font-bold text-white pt-2">
            <span className=" text-gray-300">Course Price</span>
            <span>
              {course.coursePrice ? `₹${course.coursePrice}` : "Free"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
