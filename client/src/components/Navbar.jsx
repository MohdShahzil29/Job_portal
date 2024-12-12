import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-black">FIND JOBS</div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-600 font-medium">
          <li className="hover:text-black cursor-pointer">Home</li>
          <li className="hover:text-black cursor-pointer">Jobs</li>
          <li className="hover:text-black cursor-pointer">Categories</li>
          <li className="hover:text-black cursor-pointer">Blogs</li>
          <li className="hover:text-black cursor-pointer">Testimonials</li>
          <li className="hover:text-black cursor-pointer">Contact Us</li>
          <li className="hover:text-black cursor-pointer font-bold">
            Browse jobs
          </li>
        </ul>

        {/* Post a Job Button */}
        <button className="bg-black text-white px-4 py-2 flex items-center space-x-2 rounded-md hover:bg-gray-800">
          <span>Post a Job</span>
          <FaPaperPlane />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
