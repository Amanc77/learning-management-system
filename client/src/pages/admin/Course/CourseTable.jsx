import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/utils/axiosInstance";
import { Folder } from "lucide-react";

function CourseTable() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/course/getAllCourses");
        setCourses(res?.data?.courses || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  console.log(courses);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4">
          <p className="text-gray-300 mt-1">
            Manage and track all your courses in one place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
          <Button onClick={() => navigate("create")} className="bg-blue-600">
            Create New Course
          </Button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-300 py-10">
              Loading courses...
            </p>
          ) : courses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-300 mb-4">No courses found.</p>
              <Button
                onClick={() => navigate("create")}
                className="bg-blue-600"
              >
                Create Your First Course
              </Button>
            </div>
          ) : (
            <Table className="min-w-full ">
              <TableCaption className="text-gray-400">
                List of your courses
              </TableCaption>

              {/* Table Header */}
              <TableHeader className="">
                <TableRow className="bg-gray-700  ">
                  <TableHead className="text-gray-100 font-medium">
                    Title
                  </TableHead>
                  <TableHead className="text-gray-100 font-medium">
                    Category
                  </TableHead>
                  <TableHead className="text-gray-100 font-medium">
                    Price
                  </TableHead>
                  <TableHead className="text-gray-100 font-medium">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-100 font-medium">
                    Lectures
                  </TableHead>
                  <TableHead className="text-gray-100 font-medium text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="">
                {courses.map((course) => {
                  const lectureCount = Array.isArray(course.lectures)
                    ? course.lectures.length
                    : 0;
                  const published = !!course.isPublished;

                  return (
                    <TableRow
                      key={String(course._id)}
                      className="hover:bg-gray-700/50 cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        {course.courseTitle || "Untitled"}
                      </TableCell>
                      <TableCell>{course.courseCategory || "NA"}</TableCell>
                      <TableCell>₹{course.coursePrice ?? "NA"}</TableCell>
                      <TableCell>
                        <Badge
                          className={published ? "bg-green-600" : "bg-gray-500"}
                        >
                          {published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>{lectureCount}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`${course._id}`)}
                        >
                          <Folder size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseTable;
