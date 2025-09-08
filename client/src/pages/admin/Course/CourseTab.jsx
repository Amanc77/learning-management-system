import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
import { toast } from "sonner";

const CourseTab = () => {
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
    isPublished: false,
    courseThumbnail: null,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(
          `/course/getCourse/${courseId}`
        );
        if (response.data?.success && response.data.course) {
          const {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            isPublished,
            courseThumbnail,
          } = response.data.course;
          setInput({
            courseTitle: courseTitle || "",
            subTitle: subTitle || "",
            description: description || "",
            category: category || "",
            courseLevel: courseLevel || "",
            coursePrice: coursePrice || "",
            isPublished: isPublished || false,
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

  const publishStatusHandler = () => {
    setInput((prev) => ({ ...prev, isPublished: !prev.isPublished }));
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
      Object.keys(input).forEach((key) => {
        if (input[key] !== null) formData.append(key, input[key]);
      });
      const { data } = await axiosInstance.put(
        `/course/editCourse/${courseId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast(data?.message || "Course updated successfully");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Failed to update course:", error);
      toast(error?.response?.data?.message || "Failed to update course");
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
      toast(data?.message || "Course deleted successfully");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Failed to delete course:", error);
      toast(error?.response?.data?.message || "Failed to delete course");
    }
  };

  return (
    <div className="mx-auto w-full ">
      <Card className="bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardDescription className="text-gray-400">
            Update details about your course and save changes.
          </CardDescription>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={publishStatusHandler}
              variant="outline"
              className="bg-green-600 hover:bg-green-700 text-white border-none"
            >
              {input.isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button
              onClick={deleteCourseHandler}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Remove Course
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Inputs */}
            <div className="lg:col-span-2 space-y-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <SelectItem value="Frontend Development">
                          Frontend Development
                        </SelectItem>
                        <SelectItem value="Backend Development">
                          Backend Development
                        </SelectItem>
                        <SelectItem value="Data Structures & Algorithms">
                          Data Structures & Algorithms
                        </SelectItem>
                        <SelectItem value="Java Developer">
                          Java Developer
                        </SelectItem>
                        <SelectItem value="Artificial Intelligence">
                          Artificial Intelligence
                        </SelectItem>
                        <SelectItem value="MERN FullStack Development">
                          MERN FullStack Development
                        </SelectItem>
                        <SelectItem value="Data Analytics">
                          Data Analytics
                        </SelectItem>
                        <SelectItem value="Cyber Security">
                          Cyber Security
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

            {/* Right: Thumbnail */}
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              onClick={() => navigate("/admin/courses")}
              variant="outline"
              className="border-gray-600 text-gray-300 bg-red-600 hover:bg-red-700 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={updateCourseHandler}
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
            >
              {submitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTab;
