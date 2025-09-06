import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ReactPlayer from "react-player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CourseProgress() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const res = await axiosInstance.get(
          `/purchase/course/${courseId}/details-with-status`
        );
        if (res.data.success) {
          setCourse(res.data.data.course);
          setPurchased(res.data.data.purchased);
        } else {
          setError("Failed to fetch course progress.");
        }
      } catch (err) {
        setError("Something went wrong while fetching course progress.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseProgress();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!course) return <div>Course not found.</div>;
  if (!purchased)
    return <div>You need to purchase this course to access the content.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-6">
        {course.courseTitle} - Progress
      </h1>
      <div className="space-y-8">
        {course.lectures.map((lecture, idx) => (
          <Card key={idx} className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {lecture.lectureTitle || `Lecture ${idx + 1}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReactPlayer
                width="100%"
                height="auto"
                url={lecture.videoUrl}
                controls
              />
              <p className="mt-4 text-gray-400">
                {lecture.description || "No description."}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CourseProgress;
