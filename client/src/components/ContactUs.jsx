import React from "react";
import bulb from "../assets/bulb.png"; // Ensure the image path is correct
import secondImage from "../assets/ride side image.png"; // Ensure the image path is correct

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">Contact Us</h1>
      <div className="relative w-[95%] h-[31rem] bg-white shadow-lg rounded-lg p-10">
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              placeholder="Location"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message here"
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
            ></textarea>
          </div>
        </form>

        {/* Apply Now Button */}
        <div className="mt-6 flex justify-end">
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
            Apply Now
          </button>
        </div>

        {/* Images */}
        <img
          src={bulb}
          alt="Bulb"
          className="absolute left-[22px] bottom-[54px] w-[10rem] h-[10rem]"
        />
        <img
          src={secondImage}
          alt="Paper Plane"
          className="absolute right-[11rem] bottom-4 w-[10rem] h-[10rem]"
        />
      </div>
    </div>
  );
};

export default ContactUs;
