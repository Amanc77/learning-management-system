import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "./utils/axiosInstance";
import { setUser, userLoggedOut } from "./redux/authSlice";
import "./App.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ProtectedRoute,
  AuthenticatedUser,
  AdminRoute,
} from "@/components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "@/components/PurchaseCourseProtectedRoute";

import Home from "./pages/student/Home";
import Courses from "./pages/student/Courses";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/student/Profile";
import MyLearning from "./pages/student/MyLearning";
import CourseDetails from "./pages/student/CourseDetails";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";

import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/Course/CourseTable";
import AddCourse from "./pages/admin/Course/AddCourse";
import EditCourse from "./pages/admin/Course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import UpdateLecture from "./pages/admin/lecture/UpdateLecture";

import Contact from "./components/Contact";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthenticatedUser>
              <Login />
            </AuthenticatedUser>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthenticatedUser>
              <Signup />
            </AuthenticatedUser>
          }
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/search" element={<SearchPage />} />
        <Route path="/course-detail/:courseId" element={<CourseDetails />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-learning"
          element={
            <ProtectedRoute>
              <MyLearning />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course-progress/:courseId"
          element={
            <ProtectedRoute>
              <PurchaseCourseProtectedRoute>
                <CourseProgress />
              </PurchaseCourseProtectedRoute>
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Sidebar />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<CourseTable />} />
          <Route path="courses/create" element={<AddCourse />} />
          <Route path="courses/:courseId" element={<EditCourse />} />
          <Route path="courses/:courseId/lecture" element={<CreateLecture />} />
          <Route
            path="courses/:courseId/lecture/:lectureId"
            element={<UpdateLecture />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
