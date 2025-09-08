import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import LoadingPage from "./LoadingPage";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        const res = await axiosInstance.get(
          `/purchase/course/${courseId}/status`
        );
        console.log("Purchase status response:", res.status, res.data);
        if (!mounted) return;
        setPurchased(Boolean(res.data?.purchased));
      } catch (err) {
        if (!mounted) return;
        console.error(
          "Error fetching course status:",
          err?.response?.status,
          err?.response?.data || err.message
        );
        setPurchased(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStatus();
    return () => {
      mounted = false;
    };
  }, [courseId]);

  if (loading) return <LoadingPage />;

  return purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} replace />
  );
};

export default PurchaseCourseProtectedRoute;
