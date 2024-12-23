import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useAuth } from "../../context/user";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaEdit,
} from "react-icons/fa";
import Spinner from "../../components/Spinner";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [auth, setAuth] = useAuth();
  const id = auth.user.id;

  // Fetch the profile data from the API
  const handelApi = async () => {
    try {
      const reponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/get-user-profile/${id}`
      );
      setProfile(reponse.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handelApi();
    // eslint-disable-next-line
  }, []);

  if (!profile) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex p-6 bg-gray-100">
      <Navbar />
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md ml-5">
        {/* Profile Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.avatar}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold">Name: {profile.user.name}</h2>
          <p className="text-gray-600 mb-2 mt-1">Email: {profile.user.email}</p>
          <p className="text-center text-gray-800">{profile.bio}</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4">
          {profile.socialMedia.linkedin && (
            <a
              href={profile.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaLinkedin size={24} />
            </a>
          )}
          {profile.socialMedia.instagram && (
            <a
              href={profile.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800"
            >
              <FaInstagram size={24} />
            </a>
          )}
          {profile.socialMedia.facebook && (
            <a
              href={profile.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 hover:text-blue-900"
            >
              <FaFacebook size={24} />
            </a>
          )}
          {profile.socialMedia.twitter && (
            <a
              href={profile.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <FaTwitter size={24} />
            </a>
          )}
        </div>
      </div>

      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        {/* Education */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          {profile.education.map((edu, index) => (
            <div key={index} className="flex justify-between mb-2">
              <div>
                <p className="font-medium">{edu.institution}</p>
                <p>
                  {edu.degree} in {edu.field}
                </p>
                <p>
                  {new Date(edu.startDate).getFullYear()} -{" "}
                  {new Date(edu.endDate).getFullYear()}
                </p>
              </div>
              <button className="text-blue-500 hover:text-blue-700">
                <FaEdit />
              </button>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          <ul>
            {profile.skills.map((skill, index) => (
              <li key={index} className="flex justify-between mb-2">
                <div>
                  <strong>{skill.name}:</strong> {skill.level}
                </div>
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Address</h3>
          <div className="flex justify-between">
            <div>
              <p>
                {profile.address.street}, {profile.address.city},{" "}
                {profile.address.state}, {profile.address.country}
              </p>
            </div>
            <button className="text-blue-500 hover:text-blue-700">
              <FaEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
