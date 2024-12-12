import React from "react";
import bulb from "../assets/bulb.png";
import bulbrigtSideImage from "../assets/ride side image.png";
import peopleImage from "../assets/people image.png";
import leftFlower from "../assets/leftflower.png";
import rightFlower from "../assets/rightflower.png";

const Banner = () => {
  return (
    <div className="bg-gray-50 px-6 py-10 md:px-20">
      <div className="text-center mt-[7rem]">
        <h1 className="text-4xl font-bold text-gray-900">
          Get your dream job with Find Jobs.
        </h1>
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod sed
          do eiusmod
        </p>
      </div>
      <div className="mt-6 flex justify-center">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Job Title, keywords..."
            className="w-full rounded-full border border-gray-300 px-6 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
          <button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-black px-6 py-3 text-white hover:bg-gray-800">
            Search
          </button>
        </div>
      </div>
      <div className="relative mt-10 flex justify-center">
        {/* Left Decoration */}
        <img
          src={leftFlower}
          alt="Left Decoration"
          className="absolute left-0 top-[7rem] hidden md:block"
        />
        {/* Right Decoration */}
        <img
          src={rightFlower}
          alt="Right Decoration"
          className="absolute right-0 top-[7rem] hidden md:block"
        />
        {/* People Illustration */}
        <img src={peopleImage} alt="People" className="w-full max-w-2xl" />
        {/* Bulb Image */}
        <img
          src={bulb}
          alt="Bulb"
          className="absolute top-[-18rem] left-10 hidden md:block"
        />
        <img
          src={bulbrigtSideImage}
          alt="Paper Plane"
          className="absolute top-[-18rem] right-10 hidden md:block"
        />
      </div>
    </div>
  );
};

export default Banner;
