import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle, Users, Layers } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import LoadingPage from "@/components/LoadingPage"; // ✅ import LoadingPage

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      //  get purchase status
      try {
        const res = await axiosInstance.get(
          `/purchase/course/${courseId}/details-with-status`
        );
        if (!cancelled && res.data?.success) {
          setPurchased(!!res.data.data?.purchased);
        }
      } catch (err) {
        if (!cancelled) setPurchased(false);
      }

      try {
        const publishCourse = await axiosInstance.get(
          `/course/getPublicCourseById/${courseId}`
        );
        if (publishCourse.data?.success) {
          setCourse(publishCourse.data.course || []);
        }
      } catch (err) {
        if (!cancelled) {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Failed to load course.";
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (courseId) fetchAll();

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  if (loading) {
    return <LoadingPage />; // ✅ Show LoadingPage component
  }

  if (error || !course) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 text-red-500">
        {error || "Course not found."}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course.courseTitle}
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            {course.subTitle || "Course Subtitle"}
          </p>
          <p>
            Created By{" "}
            <span className="text-indigo-400 underline italic">
              {course.creator?.name || "Unknown Creator"}
            </span>
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
            <span className="flex items-center gap-1">
              <BadgeInfo size={16} /> Last updated{" "}
              {course.updatedAt
                ? new Date(course.updatedAt).toLocaleDateString()
                : "Unknown"}
            </span>
            <span className="flex items-center gap-1">
              <Users size={16} /> {course.enrolledStudents?.length || 0}{" "}
              students enrolled
            </span>
            <span className="flex items-center gap-1">
              <Layers size={16} /> Level: {course.courseLevel || "Beginner"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-2/3 space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className="text-sm text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: course.description || "No description available.",
                }}
              />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700  mb-6">
            <CardHeader>
              <CardTitle className="text-white">Course Content</CardTitle>
              <CardDescription className="text-gray-400">
                {course.lectures?.length || 0} lecture
                {course.lectures?.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures?.length ? (
                course.lectures.map((lecture, idx) => (
                  <div
                    key={lecture._id || idx}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <span>
                      {purchased || idx === 0 ? (
                        <PlayCircle size={16} className="text-green-400" />
                      ) : (
                        <Lock size={16} className="text-red-400" />
                      )}
                    </span>
                    <p>{lecture.lectureTitle || `Lecture ${idx + 1}`}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No lectures available yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-1/3">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
                {/* ✅ Purchased: show video preview | Not purchased: show thumbnail */}
                {purchased ? (
                  course.lectures?.[0]?.videoUrl ? (
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={course.lectures[0].videoUrl}
                      controls
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <p className="text-gray-400">No preview available</p>
                    </div>
                  )
                ) : course.courseThumbnail ? (
                  <img
                    src={course.courseThumbnail}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <p className="text-gray-400">No preview available</p>
                  </div>
                )}
              </div>

              <h1 className="text-lg md:text-xl font-semibold text-white">
                Course Price:{" "}
                {course.coursePrice ? `₹${course.coursePrice}` : "Free"}
              </h1>

              <Separator className="bg-gray-600" />

              {purchased ? (
                <Button
                  onClick={() => navigate(`/course-progress/${courseId}`)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardContent>
            <CardFooter className="p-4 text-xs text-gray-500 text-center">
              Category: {course.courseCategory || "N/A"}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
