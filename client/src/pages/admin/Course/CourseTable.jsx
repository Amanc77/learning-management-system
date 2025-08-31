import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/utils/axiosInstance";
import { Badge } from "../../../components/ui/badge";
import { Edit } from "lucide-react";

function CourseTable() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/course/getAllCourses");
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 p-4 sm:p-8 text-white">
      {/* Top action button */}
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => navigate("create")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Create a new Course
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-700 rounded-lg shadow">
        <Table>
          <TableCaption className="text-gray-400">
            List of your courses
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.coursePrice || "NA"}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      course.isPublished ? "bg-green-600" : "bg-gray-500"
                    }
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-gray-600"
                    onClick={() => navigate(`${course._id}`)}
                  >
                    <Edit size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CourseTable;
