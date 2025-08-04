import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Link, Route, Routes } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import AuthPage from "./pages/auth/index.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
