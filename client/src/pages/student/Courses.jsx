import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import axiosInstance from "../../utils/axiosInstance";
import CourseCardSkeleton from "../../components/CourseCardSkeleton";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/course/publishedCourses");
        if (res.data.success) {
          setCourses(res?.data?.courses || []);
        }
        console.log(" fetch data are ", res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-white mt-10">
        Popular Courses
      </h1>

      <p className="text-center text-gray-400 mt-4">
        This is where you can browse and enroll in courses.
      </p>

      <div className="max-w-7xl mx-auto mt-8">
        {loading ? (
          // Skeleton grid while loading
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-300 py-10">Course not found...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
