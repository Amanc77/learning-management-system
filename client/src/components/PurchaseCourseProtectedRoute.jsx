import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${courseId}/status`);
        setPurchased(res.data.purchased);
      } catch {
        setPurchased(false);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [courseId]);

  if (loading) return <p>Loading...</p>;
  return purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} replace />
  );
};

export default PurchaseCourseProtectedRoute;
