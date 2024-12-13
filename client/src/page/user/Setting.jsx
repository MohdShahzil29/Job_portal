import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "axios";

const SkillModal = ({ isOpen, onClose, onSave }) => {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("Beginner");

  const handleSave = () => {
    if (skill) {
      onSave({ skill, level });
      setSkill("");
      setLevel("Beginner");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add a Skill</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Skill</label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter a skill"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleSave}
          >
            Add Skill
          </button>
        </div>
      </div>
    </div>
  );
};

const EducationModal = ({ isOpen, onClose, onSave }) => {
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (institution && degree && field && startDate) {
      onSave({
        institution,
        degree,
        field,
        startDate,
        endDate,
        grade,
        description,
      });
      setInstitution("");
      setDegree("");
      setField("");
      setStartDate("");
      setEndDate("");
      setGrade("");
      setDescription("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add Education</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Institution</label>
          <input
            type="text"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter institution name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Degree</label>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter degree"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Field of Study</label>
          <input
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter field of study"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Grade</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter grade"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Describe your education"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleSave}
          >
            Add Education
          </button>
        </div>
      </div>
    </div>
  );
};

const Setting = () => {
  const [profileData, setProfileData] = useState({
    bio: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
    },
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    skills: [],
    education: [],
    avatar: null,
  });

  const [isSkillModalOpen, setSkillModalOpen] = useState(false);
  const [isEducationModalOpen, setEducationModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      avatar: e.target.files[0],
    }));
  };

  const handleAddSkill = (newSkill) => {
    setProfileData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: newSkill.skill, level: newSkill.level }],
    }));
    setSkillModalOpen(false);
  };

  const handleAddEducation = (newEducation) => {
    setProfileData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
    setEducationModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in profileData) {
      if (key === "address" || key === "socialMedia") {
        for (const subKey in profileData[key]) {
          formData.append(`${key}.${subKey}`, profileData[key][subKey]);
        }
      } else if (key === "skills" || key === "education") {
        formData.append(key, JSON.stringify(profileData[key]));
      } else {
        formData.append(key, profileData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile Updated");
    } catch (error) {
      alert("Error creating profile");
    }
  };

  return (
    <div className="flex mt-4">
      <Navbar />
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-semibold mb-6">Complete Your Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow-md rounded-md"
        >
          <div className="mb-4">
            <label className="block font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Tell us about yourself"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your phone number"
            />
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">Address</h2>
            {["street", "city", "state", "country"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={profileData.address[field]}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, [field]: e.target.value },
                  }))
                }
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder={`Enter ${field}`}
              />
            ))}
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">Social Media Links</h2>
            {[
              { name: "facebook", icon: <FaFacebook /> },
              { name: "twitter", icon: <FaTwitter /> },
              { name: "instagram", icon: <FaInstagram /> },
              { name: "linkedin", icon: <FaLinkedin /> },
            ].map((platform) => (
              <div key={platform.name} className="flex items-center mb-2">
                {platform.icon}
                <input
                  type="text"
                  name={platform.name}
                  value={profileData.socialMedia[platform.name]}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      socialMedia: {
                        ...prev.socialMedia,
                        [platform.name]: e.target.value,
                      },
                    }))
                  }
                  className="ml-2 p-2 border border-gray-300 rounded-md w-full"
                  placeholder={`${platform.name} link`}
                />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">Skills</h2>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => setSkillModalOpen(true)}
            >
              Add Skill
            </button>
            <ul className="mt-4">
              {profileData.skills.map((skill, index) => (
                <li key={index} className="mb-2">
                  {skill.name} - {skill.level}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">Education</h2>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => setEducationModalOpen(true)}
            >
              Add Education
            </button>
            <ul className="mt-4">
              {profileData.education.map((edu, index) => (
                <li key={index} className="mb-2">
                  {edu.institution} - {edu.degree} in {edu.field}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Skill Modal */}
      <SkillModal
        isOpen={isSkillModalOpen}
        onClose={() => setSkillModalOpen(false)}
        onSave={handleAddSkill}
      />

      {/* Education Modal */}
      <EducationModal
        isOpen={isEducationModalOpen}
        onClose={() => setEducationModalOpen(false)}
        onSave={handleAddEducation}
      />
    </div>
  );
};

export default Setting;
