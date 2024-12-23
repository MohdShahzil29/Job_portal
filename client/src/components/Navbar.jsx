import React, { useEffect, useState } from "react";
import { FaPaperPlane, FaBars } from "react-icons/fa";
import { useAuth } from "../context/user";
import { useNavigate } from "react-router-dom";
import emptyImage from "../assets/dp.png";
import axios from "axios";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ avatar: null });
  const [menuOpen, setMenuOpen] = useState(false);

  const id = auth.user?.id;

  // Fetch the profile data from the API
  const handelApi = async () => {
    if (!id) return; 
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/get-user-profile/${id}`
      );
      setProfile(response.data?.profile);
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  console.log("Avatar", profile.avatar);

  useEffect(() => {
    if (id) handelApi();
  }, [id]);

  const handelRedirect = () => {
    if (auth.user.role === "recruiter") {
      navigate("/recruter");
    } else {
      navigate("/user");
    }
  };

  const handelRegister = () => {
    navigate("/register");
  };

  const handel = () => {
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div
          className="text-2xl font-bold text-black cursor-pointer"
          onClick={handel}
        >
          FIND JOBS
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="lg:hidden">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex space-y-4 lg:space-y-0 lg:space-x-6 text-gray-600 font-medium absolute lg:static bg-white top-16 left-0 w-full lg:w-auto lg:mt-0 shadow-lg lg:shadow-none z-10`}
        >
          <li
            className="hover:text-black cursor-pointer p-4 lg:p-0"
            onClick={handel}
          >
            Home
          </li>
          <li className="hover:text-black cursor-pointer p-4 lg:p-0">Jobs</li>
          <li className="hover:text-black cursor-pointer p-4 lg:p-0">Blogs</li>
          <li className="hover:text-black cursor-pointer p-4 lg:p-0">
            Testimonials
          </li>
          <li className="hover:text-black cursor-pointer p-4 lg:p-0">
            Contact Us
          </li>
          <li className="hover:text-black cursor-pointer font-bold p-4 lg:p-0">
            Browse jobs
          </li>
          <div className="p-4 lg:hidden">
            {auth?.user ? (
              <button
                onClick={handelRedirect}
                className="bg-black text-white px-4 py-2 flex items-center space-x-2 rounded-md hover:bg-gray-800 w-full"
              >
                <span>Your Profile</span>
                <FaPaperPlane />
              </button>
            ) : (
              <button
                onClick={handelRegister}
                className="bg-black text-white px-4 py-2 flex items-center space-x-2 rounded-md hover:bg-gray-800 w-full"
              >
                <span>Register</span>
                <FaPaperPlane />
              </button>
            )}
          </div>
          <div className="flex justify-center p-4 lg:hidden ">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile"
                className="rounded-full h-10 w-10"
              />
            ) : (
              <img
                src={emptyImage}
                alt="Profile"
                className="rounded-full h-10 w-10"
              />
            )}
          </div>
        </ul>

        {/* Post a Job Button */}
        <div className="hidden lg:flex gap-6 items-center mt-4 lg:mt-0">
          {auth?.user ? (
            <button
              onClick={handelRedirect}
              className="bg-black text-white px-4 py-2 flex items-center space-x-2 rounded-md hover:bg-gray-800"
            >
              <span>Your Profile</span>
              <FaPaperPlane />
            </button>
          ) : (
            <button
              onClick={handelRegister}
              className="bg-black text-white px-4 py-2 flex items-center space-x-2 rounded-md hover:bg-gray-800"
            >
              <span>Register</span>
              <FaPaperPlane />
            </button>
          )}
          <div>
            {profile?.avatar ? (
              <img
                src={profile?.avatar}
                alt="Profile"
                className="rounded-full h-10 w-10"
              />
            ) : (
              <img
                src={emptyImage}
                alt="Profile"
                className="rounded-full h-10 w-10"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
