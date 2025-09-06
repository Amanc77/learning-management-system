import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function MyLearning() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get("/purchase/purchased");
        const list = res?.data?.data?.purchasedCourse || [];
        setCourses(list);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#161e33] px-4 sm:px-6 lg:px-8 py-8 text-white">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">
          My Learning
        </h2>
        <p className="text-gray-400 mt-2 mb-8 text-center">
          Your enrolled courses appear below
        </p>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden bg-gray-800 animate-pulse"
              >
                <div className="h-40 bg-gray-700" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-red-400 py-10">{error}</div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            You are not enrolled in any courses.
          </div>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {courses.map((course) => (
              <div
                key={course._id || course.courseId._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                onClick={() =>
                  navigate(`/course-progress/${course.courseId._id}`)
                }
              >
                <div className="relative w-full h-44 bg-gray-700">
                  <img
                    src={course.courseId.courseThumbnail}
                    alt={course.courseId.courseTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-white text-sm sm:text-base font-semibold mb-2 line-clamp-2">
                    {course.courseId.courseTitle}
                  </h3>
                  <div className="mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course-progress/${course.courseId._id}`);
                      }}
                      className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyLearning;
