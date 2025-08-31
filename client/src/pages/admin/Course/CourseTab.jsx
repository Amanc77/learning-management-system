import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
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
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import RichTextEditor from "../../../components/RichTextEditor";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

function CourseTab() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  console.log("courseIdd", courseId);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });

  // Fetch course data on mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/course/getCourse/${courseId}`
        );
        if (data?.course) {
          const {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail,
          } = data.course;
          setInput({
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail: null,
          });
          setPreviewThumbnail(courseThumbnail || "");
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };
    fetchCourse();
  }, [courseId]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectedCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  // Update course
  const updateCourseHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("courseTitle", input.courseTitle);
      formData.append("subTitle", input.subTitle);
      formData.append("description", input.description);
      formData.append("category", input.category);
      formData.append("courseLevel", input.courseLevel);
      formData.append("coursePrice", input.coursePrice);
      if (input.courseThumbnail) {
        formData.append("courseThumbnail", input.courseThumbnail);
      }

      const { data } = await axiosInstance.put(
        `/course/editCourse/${courseId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(data?.message || "Course updated successfully!");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Failed to update course:", error);
      alert(error?.response?.data?.message || "Failed to update course");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete course
  const deleteCourseHandler = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const { data } = await axiosInstance.delete(
        `/course/deleteCourse/${courseId}`
      );
      alert(data?.message || "Course deleted successfully!");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert(error?.response?.data?.message || "Failed to delete course");
    }
  };

  const isPublished = false;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900  ">
      <Card className="bg-gray-700/90 backdrop-blur-md text-white shadow-xl rounded-2xl border border-gray-600">
        <CardHeader className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <CardTitle className="text-2xl sm:text-3xl font-semibold">
              Basic Course Information
            </CardTitle>
            <CardDescription className="text-blue-300 pt-2 text-sm sm:text-base">
              Make changes to your course and click save when you’re done.
            </CardDescription>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-500 hover:to-indigo-600 rounded-xl shadow-md transition-all"
            >
              {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button
              onClick={deleteCourseHandler}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl shadow-md transition-all"
            >
              Remove Course
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6 mt-5">
            {/* Course Title */}
            <div>
              <Label className="mb-2 block text-gray-200">Course Title</Label>
              <Input
                type="text"
                placeholder="Enter course title"
                name="courseTitle"
                value={input.courseTitle || ""}
                onChange={changeEventHandler}
                className="w-full bg-gray-800 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Subtitle */}
            <div>
              <Label className="mb-2 block text-gray-200">Subtitle</Label>
              <Input
                type="text"
                placeholder="Ex: Become a Full Stack developer from Zero to Hero."
                name="subTitle"
                value={input.subTitle || ""}
                onChange={changeEventHandler}
                className="w-full bg-gray-800 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <Label className="mb-2 block text-gray-200">Description</Label>
              <div className="bg-gray-800 rounded-xl p-2 border border-gray-600">
                <RichTextEditor input={input} setInput={setInput} />
              </div>
            </div>

            {/* Category, Level, Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label className="mb-2 block text-gray-200">Category</Label>
                <Select onValueChange={selectedCategory} value={input.category}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white rounded-xl">
                    <SelectGroup>
                      <SelectLabel>Select a Course</SelectLabel>
                      <SelectItem value="Data Analytics">
                        Data Analytics
                      </SelectItem>
                      <SelectItem value="MERN FullStack Development">
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

              <div>
                <Label className="mb-2  block text-gray-200">
                  Course Level
                </Label>
                <Select
                  onValueChange={selectCourseLevel}
                  value={input.courseLevel}
                >
                  <SelectTrigger className="w-[200px] bg-gray-800 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-blue-500 scroll-none   scrollbar-hide">
                    <SelectValue placeholder="Select a Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white rounded-xl">
                    <SelectGroup className="scrollbar-hide">
                      <SelectLabel>Select a Level</SelectLabel>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Advance">Advance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block text-gray-200">Price (INR)</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice || ""}
                  onChange={changeEventHandler}
                  placeholder="199"
                  className="w-full bg-gray-800 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <Label className="mb-2 block text-gray-200">
                Course Thumbnail
              </Label>
              <Input
                type="file"
                accept="image/*"
                className="w-[400px] bg-gray-600 border-gray-600 text-white rounded-xl  file:text-orange-500 file:font-bold "
                onChange={fileChangeHandler}
              />
              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  alt="Course Thumbnail"
                  className="w-fit max-w-sm my-4 rounded-lg shadow-md border border-gray-600"
                />
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              onClick={() => navigate("/admin/courses")}
              variant="outline"
              className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 rounded-xl shadow-md transition-all"
            >
              Cancel
            </Button>
            <Button
              onClick={updateCourseHandler}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl shadow-md transition-all"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseTab;
