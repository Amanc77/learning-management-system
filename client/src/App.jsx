import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Student Pages
import Home from "./pages/student/Home";
import Courses from "./pages/student/Courses";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/student/Profile";
import MyLearning from "./pages/student/MyLearning";

// Admin Pages
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/Course/CourseTable";
import AddCourse from "./pages/admin/Course/AddCourse";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/my-learning" element={<MyLearning />} />

        <Route path="/admin" element={<Sidebar />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="courses" element={<CourseTable />} />
          <Route path="courses/create" element={<AddCourse />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
