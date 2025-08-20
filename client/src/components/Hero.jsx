import { Award, Search, User } from "lucide-react";
import React from "react";
import HeroImg from "../assets/lmsGirl.png";
import CountUp from "react-countup";

const Hero = () => {
  return (
    <div className="bg-slate-800">
      <div className="lg:h-[700px] max-w-7xl mx-auto flex md:flex-row flex-col gap-10 items-center">
        {/* text section */}
        <div className="space-y-7 px-4 md:px-0">
          <h1 className="text-4xl mt-10 md:mt-0 md:text-6xl font-extrabold text-gray-200">
            Explore Our <span className="text-blue-500">14000+</span> <br />{" "}
            Online courses for all
          </h1>
          <p className="text-gray-300 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            consectetur adipiscing elit tempor ut labore
          </p>
          <div className="inline-flex relative">
            <input
              type="text"
              placeholder="Search Your Course Here..."
              className="bg-gray-200 w-[350px] md:w-[450px] text-gray-800 p-4 pr-40 rounded-lg rounded-r-xl placeholder:text-gray-500"
            />
            <button className="px-4 py-[14px] flex gap-1 items-center bg-blue-500 font-semibold absolute right-0 text-white rounded-r-lg text-xl">
              Search
              <Search width={20} height={20} />
            </button>
          </div>
        </div>
        {/* image section */}
        <div className="flex  md:h-[700px] w-full items-end relative px-4 md:px-0">
          <img src={HeroImg} alt="" className="w-[700px] " />
          <div className="bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[40%] right-[-10%] px-4 py-2">
            <div className="rounded-full bg-blue-400 p-2 text-white ">
              <User />
            </div>
            <div>
              <h2 className="font-bold text-2xl">
                <CountUp end={852} />+
              </h2>
              <p className="italic text-sm text-gray-600 leading-none">
                Active Students
              </p>
            </div>
          </div>
          <div className="bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[15%] left-8 px-4 py-2">
            <div className="rounded-full bg-blue-400 p-2 text-white">
              <Award />
            </div>
            <div>
              <h2 className="font-bold text-2xl">
                <CountUp end={184} />+
              </h2>
              <p className="italic text-sm text-gray-600 leading-none">
                Certified Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
