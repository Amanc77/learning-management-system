import { Award, Search, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroImg from "../assets/lmsGirl.png";
import CountUp from "react-countup";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/course/search?query=${encodeURIComponent(q)}`);
    }
    setSearchQuery("");
  };

  return (
    <div
      className="bg-gradient-to-b from-gray-950 to-gray-800
"
    >
      <div
        className="lg:h-[700px] max-w-7xl  flex flex-col md:flex-row gap-10 items-center
       md:px-6 lg:px-0 m-auto px-6"
      >
        {/* text section */}
        <div className="flex-1 mt-5 lg:mt-0 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-100 leading-tight">
            Explore Our <span className="text-blue-400">140+</span>
            <br className="hidden sm:block" />
            Online courses for all
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-lg mx-auto md:mx-0">
            Learn new skills with top mentors. Hands-on projects, peer support,
            and job-ready tracks.
          </p>

          <div className="w-full flex justify-center md:justify-start">
            <form
              onSubmit={searchHandler}
              className="w-full flex justify-center md:justify-start"
            >
              <div className="flex w-full max-w-md rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
                <input
                  type="text"
                  placeholder="Search your course here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-gray-800 text-gray-100 p-3 sm:p-4 placeholder:text-gray-500 text-sm sm:text-base focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 sm:py-[14px] flex gap-2 items-center bg-blue-500 font-semibold text-white text-sm sm:text-lg hover:bg-blue-600 transition"
                >
                  <Search width={18} height={18} />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex-1 h-full flex items-center justify-center relative">
          <img
            src={HeroImg}
            alt="LMS Hero"
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px] h-auto lg:scale-113"
          />

          <div className="hidden md:flex gap-3 items-center rounded-xl bg-gray-800 border border-gray-700 shadow-lg absolute top-[20%] left-4 md:left-8 px-3 sm:px-4 py-2">
            <div className="rounded-full bg-blue-500 p-2 sm:p-3 text-white">
              <Award />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-2xl text-gray-100">
                <CountUp end={184} />+
              </h2>
              <p className="italic text-xs sm:text-sm text-gray-400 leading-none">
                Certified Students
              </p>
            </div>
          </div>

          <div className="hidden md:flex gap-3 items-center rounded-xl bg-gray-800 border border-gray-700 shadow-lg absolute top-[50%] right-4 md:right-[-18%] px-3 sm:px-4 py-2">
            <div className="rounded-full bg-blue-500 p-2 sm:p-3 text-white">
              <User />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-2xl text-gray-100">
                <CountUp end={852} />+
              </h2>
              <p className="italic text-xs sm:text-sm text-gray-400 leading-none">
                Active Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
