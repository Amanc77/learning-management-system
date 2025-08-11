import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Link, Route, Routes } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import AuthPage from "./pages/auth/index.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./components/Courses.jsx";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/Forgot-password";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Login" element={<Login />} />

      <Route path="/Signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/courses" element={<Courses />} />
    </Routes>
  );
}

export default App;
