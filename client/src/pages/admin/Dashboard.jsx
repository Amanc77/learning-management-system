import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../utils/axiosInstance";

const Dashboard = () => {
  const [purchasedCourse, setPurchasedCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialStudents = 11;
  const baseCoursePrice = 2000;

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await axiosInstance.get("/purchase/purchased");
        if (response.data && Array.isArray(response.data.purchasedCourse)) {
          setPurchasedCourse(response.data.purchasedCourse);
        } else {
          setPurchasedCourse([]);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch purchased courses");
        setLoading(false);
      }
    };
    fetchPurchasedCourses();
  }, []);

  if (loading)
    return (
      <h1 className="text-center mt-10 text-xl text-gray-100">Loading...</h1>
    );
  if (error) return <h1 className="text-center mt-10 text-red-500">{error}</h1>;

  const totalStudents = initialStudents + purchasedCourse.length;
  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  // Map courses and add base price for chart
  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice + baseCoursePrice, // start from 5000
  }));

  return (
    <div className="min-h-screen p-4 bg-gray-900">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card className="bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-gray-100">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-400">{totalStudents}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-gray-100">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-400">₹{totalRevenue}</p>
          </CardContent>
        </Card>

        {/* Course Prices Chart */}
        <Card className="bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-100">
              Course Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={courseData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis
                  dataKey="name"
                  stroke="#d1d5db"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis
                  stroke="#d1d5db"
                  domain={[baseCoursePrice, "auto"]} // start Y-axis from 5000
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                  }}
                  formatter={(value, name) => [`₹${value}`, name]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ stroke: "#3b82f6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
