import React, { useState, useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import DisplayLectures from "./DisplayLectures";
import BackButton from "../../../components/BackButton";

function AddCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [lectureTitle, setLectureTitle] = useState("");
  const [lectures, setLectures] = useState([]);

  const fetchLectures = async () => {
    try {
      const response = await axiosInstance.get(
        `/course/${courseId}/getCourseLecture`
      );
      setLectures(response.data.lectures || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch lectures");
    }
  };

  useEffect(() => {
    fetchLectures();
  }, [courseId]);

  const handleLectureCreation = async (e) => {
    e.preventDefault();
    if (!lectureTitle) {
      toast.error("Lecture title is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("lectureTitle", lectureTitle);

      const response = await axiosInstance.post(
        `/course/${courseId}/createLecture`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message || "Lecture created successfully!");
        setLectureTitle(""); // clear input
        fetchLectures(); // refresh lectures automatically
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen p-4 text-white bg-gray-800">
      <div className="mb-6">
        <div className=" flex gap-3 ">
          <BackButton />
          <h1 className="text-2xl  mt-1 font-semibold">Add Lecture</h1>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Provide basic details to create a new lecture.
        </p>
      </div>

      <div className="space-y-6 max-w-xl">
        <div>
          <Label className="mb-2 block">Lecture Title</Label>
          <Input
            type="text"
            placeholder="Enter your lecture title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="bg-gray-700 border-gray-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate(`/admin/courses/${courseId}`)}
            className="bg-red-500 hover:bg-red-600"
          >
            Back to course
          </Button>
          <Button
            onClick={handleLectureCreation}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create Lecture
          </Button>
        </div>
      </div>

      <DisplayLectures lectures={lectures} />
    </div>
  );
}

export default AddCourse;
