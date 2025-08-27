import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "./pages/student/Home";
import Courses from "@/pages/student/Courses";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/student/Profile";
import MyLearning from "./pages/student/MyLearning";

function App() {
  const [count, setCount] = useState(0);

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
      </Routes>

      <Footer />
    </>
  );
}

export default App;
