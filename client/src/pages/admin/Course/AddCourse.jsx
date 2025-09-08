import React, { useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import BackButton from "../../../components/BackButton";

function AddCourse() {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCategory, setCourseCategory] = useState("");

  const handleCourseCreation = async (e) => {
    e.preventDefault();
    if (!courseTitle || !courseCategory) {
      toast.error("Course title and category are required");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("courseTitle", courseTitle.trim());
      formData.append("courseCategory", courseCategory.trim());

      const response = await axiosInstance.post(
        "/course/createCourse",
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message || "Course created successfully!");
        navigate("/admin/courses");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 px-4 py-6 sm:px-10 text-white">
      <div className="mb-6">
        <div className=" flex  gap-3">
          <BackButton />
          <h1 className="text-2xl font-semibold mt-1">Add Course</h1>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Provide basic details to create a new course.
        </p>
      </div>

      <div className="space-y-6 max-w-xl">
        <div>
          <Label className="mb-2 block">Course Title</Label>
          <Input
            type="text"
            placeholder="Enter your course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="bg-gray-700 border-gray-600"
          />
        </div>
        <div>
          <Label className="mb-2 block">Category</Label>
          <Select onValueChange={setCourseCategory}>
            <SelectTrigger className="bg-gray-700 border-gray-600">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-white max-h-60 overflow-auto">
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Backend Development">
                  Backend Development
                </SelectItem>
                <SelectItem value="Data Structures & Algorithms">
                  Data Structures & Algorithms
                </SelectItem>
                <SelectItem value="Java Developer">Java Developer</SelectItem>
                <SelectItem value="MERN FullStack Development">
                  MERN FullStack Development
                </SelectItem>
                <SelectItem value="Artificial Intelligence">
                  Artificial Intelligence
                </SelectItem>
                <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                <SelectItem value="Cyber Security">Cyber Security</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate("/admin/courses")}
            className="bg-red-500 hover:bg-red-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCourseCreation}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create Course
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
