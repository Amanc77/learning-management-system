import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-xl bg-gray-800 border border-gray-800 hover:shadow-2xl hover:scale-[1.04] transition-all duration-300 p-0 pb-5">
        <div className="relative w-full h-56 overflow-hidden rounded-t-xl border-b border-gray-700 bg-black">
          <img
            src={course.courseThumbnail || course.image}
            alt={course.courseTitle || course.title}
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>

        <CardContent className="space-y-2">
          <h1 className="hover:underline font-bold text-white text-lg truncate">
            {course.courseTitle || course.title}
          </h1>

          <div
            className="text-gray-400 text-sm line-clamp-2"
            dangerouslySetInnerHTML={{ __html: course.description }} //fix <p> tag issue.
          />

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-gray-700">
                <AvatarImage
                  src={
                    course.creator?.photoUrl ||
                    `https://api.dicebear.com/7.x/thumbs/svg?seed=${
                      course.creator?.name || "Unknown"
                    }`
                  }
                  alt={course.creator?.name || "Instructor"}
                />
                <AvatarFallback>
                  {(course.creator?.name || "U")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-gray-300 text-base">
                {course.creator?.name || "Unknown"}
              </h1>
            </div>
            <Badge className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full shadow">
              {course.courseLevel || "Beginner"}
            </Badge>
          </div>

          <div className="flex justify-between text-xl font-bold text-white pt-2">
            <span className="text-gray-300">Course Price</span>
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
