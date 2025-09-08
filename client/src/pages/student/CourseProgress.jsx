import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";
import LoadingPage from "../../components/LoadingPage";

const BASE = "/progress";

const CourseProgress = () => {
  const { courseId } = useParams();

  const [courseDetails, setCourseDetails] = useState(null);
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);

  const [markCompleteData, setMarkCompleteData] = useState(null);
  const [completedSuccess, setCompletedSuccess] = useState(false);
  const [markInCompleteData, setMarkInCompleteData] = useState(null);
  const [inCompletedSuccess, setInCompletedSuccess] = useState(false);

  const videoRef = useRef(null);

  //  Fetch course details & progress
  const fetchCourseProgress = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await axiosInstance.get(`${BASE}/${courseId}`);
      const payload = res.data?.data ?? res.data;
      if (!payload) throw new Error("Unexpected response shape");

      const normalizedCourse = payload.courseDetails ?? payload.course ?? null;
      setCourseDetails(normalizedCourse);
      setProgress(Array.isArray(payload.progress) ? payload.progress : []);
      setCompleted(Boolean(payload.completed));

      if (!currentLecture && normalizedCourse?.lectures?.length > 0) {
        setCurrentLecture(normalizedCourse.lectures[0]);
      }
    } catch (err) {
      console.error("fetchCourseProgress error:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseProgress();
  }, [courseId]);

  const updateLectureProgress = async ({ courseId: cId, lectureId }) =>
    (await axiosInstance.post(`${BASE}/${cId}/lecture/${lectureId}/view`)).data;

  const completeCourse = async (cId) => {
    const res = await axiosInstance.post(`${BASE}/${cId}/complete`);
    setMarkCompleteData(res.data);
    setCompletedSuccess(true);
    return res.data;
  };

  const inCompleteCourse = async (cId) => {
    const res = await axiosInstance.post(`${BASE}/${cId}/incomplete`);
    setMarkInCompleteData(res.data);
    setInCompletedSuccess(true);
    return res.data;
  };

  //  Handle completion
  useEffect(() => {
    if (completedSuccess) {
      fetchCourseProgress();
      toast.success(markCompleteData?.message || "Course marked as completed");
      setCompletedSuccess(false);
    }
    if (inCompletedSuccess) {
      fetchCourseProgress();
      toast.success(
        markInCompleteData?.message || "Course marked as incomplete"
      );
      setInCompletedSuccess(false);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const isLectureCompleted = (lectureId) =>
    progress.some((p) => p.lectureId === lectureId && p.viewed);

  const handleLectureProgress = async (lectureId, shouldRefetch = false) => {
    try {
      await updateLectureProgress({ courseId, lectureId });
      if (shouldRefetch) {
        await fetchCourseProgress();
      } else {
        setProgress((prev) =>
          prev.some((p) => p.lectureId === lectureId)
            ? prev.map((p) =>
                p.lectureId === lectureId ? { ...p, viewed: true } : p
              )
            : [...prev, { lectureId, viewed: true }]
        );
      }
    } catch (err) {
      console.error("handleLectureProgress error:", err);
      toast.error("Failed to update lecture progress");
    }
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    if (lecture?._id) handleLectureProgress(lecture._id, false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  };

  const handleCompleteCourse = async () => {
    try {
      await completeCourse(courseId);
    } catch {
      toast.error("Failed to mark course completed");
    }
  };

  const handleInCompleteCourse = async () => {
    try {
      await inCompleteCourse(courseId);
    } catch {
      toast.error("Failed to mark course incomplete");
    }
  };

  if (isLoading) return <LoadingPage />;
  if (isError)
    return (
      <p className="text-center text-red-400 mt-20">
        Failed to load course details
      </p>
    );
  if (!courseDetails)
    return <p className="text-center text-gray-400 mt-20">No course found</p>;

  const { courseTitle = "Untitled Course", lectures = [] } = courseDetails;
  const initialLecture =
    currentLecture || (lectures.length > 0 ? lectures[0] : null);
  const completedLectures = progress.filter((p) => p.viewed).length;
  const totalLectures = lectures.length;
  const courseProgressPercentage =
    totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0;

  return (
    <div className="p-11 bg-gray-900 text-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-col">
          <h1 className=" text-2xl lg:text-3xl font-bold text-blue-400">
            {courseTitle}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <Progress
              value={courseProgressPercentage}
              className="w-60 h-3 rounded-full"
            />
            <span className="text-sm text-gray-400 font-medium">
              {completedLectures}/{totalLectures} lectures completed
            </span>
          </div>
        </div>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          className={`px-6 py-2 font-semibold ${
            completed
              ? "border-green-500 text-green-500 hover:bg-green-500/20"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {completed ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" /> Completed
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Video section */}
        <div className="flex-1 w-full lg:w-4/5 rounded-xl shadow-2xl p-4 bg-gray-800">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-700">
            {initialLecture?.videoUrl ? (
              initialLecture.videoUrl.includes("youtube.com") ||
              initialLecture.videoUrl.includes("youtu.be") ? (
                <iframe
                  src={
                    initialLecture.videoUrl.includes("watch?v=")
                      ? initialLecture.videoUrl.replace("watch?v=", "embed/")
                      : initialLecture.videoUrl.replace(
                          "youtu.be/",
                          "www.youtube.com/embed/"
                        )
                  }
                  title={initialLecture.lectureTitle}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={videoRef}
                  key={initialLecture._id}
                  src={initialLecture.videoUrl}
                  controls
                  className="w-full h-full rounded-lg"
                  onPlay={() =>
                    handleLectureProgress(initialLecture._id, false)
                  }
                  onEnded={() =>
                    handleLectureProgress(initialLecture._id, true)
                  }
                />
              )
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                No video available
              </div>
            )}
          </div>

          {/* 🔹 Video Details */}
          {initialLecture && (
            <div className="mt-8 space-y-3">
              <h3 className="font-semibold text-2xl text-gray-100">
                {`Lecture ${
                  lectures.findIndex((lec) => lec._id === initialLecture._id) +
                  1
                }: ${initialLecture.lectureTitle}`}
              </h3>

              {/* Description */}
              {initialLecture.description && (
                <p className="text-gray-400 text-sm leading-relaxed">
                  {initialLecture.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Lecture Sidebar */}
        <div className="flex flex-col w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-gray-700 lg:pl-6 pt-6 lg:pt-0">
          <h2 className="font-semibold text-2xl mb-4 text-blue-400">
            Course Lectures
          </h2>
          <div className="flex-1 overflow-y-auto max-h-[600px] pr-4 space-y-1">
            {lectures.length > 0 ? (
              lectures.map((lecture) => (
                <Card
                  key={lecture._id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-[1.01] ${
                    lecture._id === initialLecture?._id
                      ? "bg-gray-700 border-blue-500 shadow-xl"
                      : "bg-gray-800 shadow-md"
                  } rounded-lg`}
                  onClick={() => handleSelectLecture(lecture)}
                >
                  <CardContent className="flex items-center justify-between p-2 h-4">
                    <div className="flex items-center gap-3">
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2 size={24} className="text-green-400" />
                      ) : (
                        <CirclePlay size={24} className="text-gray-400" />
                      )}
                      <CardTitle className=" text-sm lg:text-lg font-medium text-gray-100">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                    {isLectureCompleted(lecture._id) && (
                      <Badge
                        variant="outline"
                        className="bg-green-900/50 text-green-300 text-xs font-semibold"
                      >
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-400">No lectures available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
