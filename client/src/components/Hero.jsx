import { Award, Search, User } from "lucide-react";
import React from "react";
import HeroImg from "../assets/lmsGirl.png";
import CountUp from "react-countup";

const Hero = () => {
  return (
    <div className="bg-slate-800">
      <div
        className="lg:h-[700px] max-w-7xl  flex flex-col md:flex-row gap-10 items-center
       md:px-6 lg:px-0 m-auto px-6"
      >
        {/* text section */}
        <div className="flex-1 mt-5 lg:mt-0 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-200 leading-tight">
            Explore Our <span className="text-blue-500">14000+</span>{" "}
            <br className="hidden sm:block" />
            Online courses for all
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-lg mx-auto md:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            consectetur adipiscing elit tempor ut labore
          </p>

          {/* Search bar */}
          <div className="w-full flex justify-center md:justify-start">
            <div className="flex w-full max-w-md">
              <input
                type="text"
                placeholder="Search Your Course Here..."
                className="flex-1 bg-gray-200 text-gray-800 p-3 sm:p-4 rounded-l-lg placeholder:text-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="px-4 sm:px-6 py-2 sm:py-[14px] flex gap-1 items-center bg-blue-500 font-semibold text-white rounded-r-lg text-sm sm:text-lg hover:bg-blue-600 transition">
                Search
                <Search width={18} height={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* image section */}
        <div className="flex-1 h-full flex items-center justify-center relative">
          <img
            src={HeroImg}
            alt="LMS Hero"
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px] h-auto lg:scale-113 "
          />

          {/* Cards - hidden on mobile */}
          <div className="hidden md:flex gap-3 items-center rounded-md bg-slate-200 shadow-md absolute top-[20%] left-4 md:left-8 px-3 sm:px-4 py-2">
            <div className="rounded-full bg-blue-400 p-2 sm:p-3 text-white">
              <Award />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-2xl">
                <CountUp end={184} />+
              </h2>
              <p className="italic text-xs sm:text-sm text-gray-600 leading-none">
                Certified Students
              </p>
            </div>
          </div>

          <div className="hidden md:flex gap-3 items-center rounded-md bg-slate-200 shadow-md absolute top-[50%] right-4 md:right-[-18%] px-3 sm:px-4 py-2">
            <div className="rounded-full bg-blue-400 p-2 sm:p-3 text-white">
              <User />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-2xl">
                <CountUp end={852} />+
              </h2>
              <p className="italic text-xs sm:text-sm text-gray-600 leading-none">
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
