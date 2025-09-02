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
            courseTitle: courseTitle || "",
            subTitle: subTitle || "",
            description: description || "",
            category: category || "",
            courseLevel: courseLevel || "",
            coursePrice: String(coursePrice ?? ""),
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
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const selectedCategory = (value) => {
    setInput((prev) => ({ ...prev, category: value }));
  };

  const selectCourseLevel = (value) => {
    setInput((prev) => ({ ...prev, courseLevel: value }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setInput((prev) => ({ ...prev, courseThumbnail: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewThumbnail(reader.result);
    reader.readAsDataURL(file);
  };

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

      alert(data?.message || "Course updated successfully");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Failed to update course:", error);
      alert(error?.response?.data?.message || "Failed to update course");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteCourseHandler = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const { data } = await axiosInstance.delete(
        `/course/deleteCourse/${courseId}`
      );
      alert(data?.message || "Course deleted successfully");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert(error?.response?.data?.message || "Failed to delete course");
    }
  };

  const isPublished = false;

  return (
    <div className="mx-auto w-full ">
      <Card className="bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardDescription className="text-gray-400">
              Update details about your course and save changes.
            </CardDescription>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button
              variant="outline"
              className="bg-green-600 hover:bg-green-700 text-white border-none"
            >
              {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button
              onClick={deleteCourseHandler}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Remove Course
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input
                  type="text"
                  name="courseTitle"
                  value={input.courseTitle}
                  onChange={changeEventHandler}
                  placeholder="Enter course title"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  type="text"
                  name="subTitle"
                  value={input.subTitle}
                  onChange={changeEventHandler}
                  placeholder="Ex: Become a Full Stack developer"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <RichTextEditor input={input} setInput={setInput} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label className="mb-1.5">Category</Label>
                  <Select
                    onValueChange={selectedCategory}
                    value={input.category}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                      <SelectGroup>
                        <SelectItem value="Data Analytics">
                          Data Analytics
                        </SelectItem>
                        <SelectItem value="MERN FullStack Development">
                          MERN FullStack Development
                        </SelectItem>
                        <SelectItem value="Data Science">
                          Data Science
                        </SelectItem>
                        <SelectItem value="Artificial Intelligence">
                          Artificial Intelligence
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-1.5">Course Level</Label>
                  <Select
                    onValueChange={selectCourseLevel}
                    value={input.courseLevel}
                    className=" "
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                      <SelectGroup>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Advance">Advance</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-1.5">Price (INR)</Label>
                  <Input
                    type="number"
                    name="coursePrice"
                    value={input.coursePrice}
                    onChange={changeEventHandler}
                    placeholder="199"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-1 space-y-4">
              <div>
                <Label className="mb-1.5">Course Thumbnail</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={fileChangeHandler}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                {previewThumbnail && (
                  <div className="mt-4 border border-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={previewThumbnail}
                      alt="Course Thumbnail"
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-400">
                Recommended ratio 16:9. Upload a clear, descriptive image.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={() => navigate("/admin/courses")}
              variant="outline"
              className="border-gray-600 text-gray-300 bg-red-600 hover:bg-red-700"
            >
              Cancel
            </Button>
            <Button
              onClick={updateCourseHandler}
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
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
