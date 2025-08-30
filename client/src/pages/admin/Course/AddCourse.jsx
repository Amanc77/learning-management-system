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

function AddCourse() {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCategory, setCourseCategory] = useState("");

  const getCourseTitle = (e) => {
    console.log(courseTitle, " and ", courseCategory);
  };

  const getSelectedCategory = (value) => {
    setCourseCategory(value);
  };

  const handleCourseCreation = async (e) => {
    e.preventDefault();
    if (!courseTitle || !courseCategory) {
      alert("course title and course category is require");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("courseTitle", courseTitle.trim());
      formData.append("courseCategory", courseCategory.trim());

      const response = await axiosInstance.post(
        "/api/v1/course/createCourse",
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message || "course Created successfully ");
        navigate("/admin/courses");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className=" min-h-screen bg-gray-700 pt-5 pl-10">
      <div className=" m-2  p-3  ">
        <h1 className="text-2xl mt-5  flex  items-center">
          Add course in dashboard by providing basic details
        </h1>
        <p className=" mt-2  ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
          ipsam?
        </p>
      </div>
      <div className=" space-y-5">
        <div className=" w-[500px] outline-none">
          <Label className="mb-2 outline-none">Title</Label>
          <Input
            type="text"
            name="courseTitle"
            placeholder="Your Course Name"
            className="outline-none"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          ></Input>
        </div>

        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory} className="bg-gray-700">
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-600 text-amber-200  outline-none">
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="Frontend development">
                  Frontend development
                </SelectItem>
                <SelectItem value="Backend development">
                  Backend development
                </SelectItem>
                <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                <SelectItem value=" MERN FullStack Development">
                  MERN FullStack Development
                </SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Artificial Intelligence">
                  Artificial Intelligence
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=" flex gap-5">
          <Button
            onClick={() => navigate("/admin/courses")}
            className="bg-blue-500"
          >
            Back
          </Button>
          <Button onClick={handleCourseCreation}>Create</Button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
