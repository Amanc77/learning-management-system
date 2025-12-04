import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CourseCardSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-xl bg-gray-800 border border-gray-800 shadow-lg p-0 pb-5 animate-pulse">
      {/* Thumbnail */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-xl border-b border-gray-700 bg-gray-700" />

      <CardContent className="space-y-3 mt-3">
        {/* Title */}
        <div className="h-5 bg-gray-700 rounded w-3/4"></div>

        {/* Description lines */}
        <div className="space-y-2 mt-2">
          <div className="h-3 bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        </div>

        {/* Instructor + badge */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-700"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
          </div>

          <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
        </div>

        {/* Price row */}
        <div className="flex justify-between items-center pt-4">
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
          <div className="h-5 w-16 bg-gray-700 rounded"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCardSkeleton;
