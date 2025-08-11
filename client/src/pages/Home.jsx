import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Courses from "../components/Courses";
import Footer from "../components/Footer";
function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Courses />
      <Footer />
    </div>
  );
}

export default Home;
