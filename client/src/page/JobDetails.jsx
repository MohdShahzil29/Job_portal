import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useAuth } from "../context/user";
import { useApply } from "../context/apply";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [auth] = useAuth();
  const { slug } = useParams();
  const [apply, setApply] = useApply(); // Getting apply context

  // Fetch job details
  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/recruter/get-post/${slug}`
      );
      setJob(response.data.product);
    } catch (error) {
      console.log("Error fetching job details:", error);
    }
  };

  // Fetch user profile if logged in and check if user has applied
  const fetchUserProfile = async () => {
    if (!auth?.user) {
      setIsUserLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/get-user-profile/${
          auth.user.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setUser(response.data.user);

      // Check if the user has already applied
      const appliedJob = response.data.user.appliedJobs.find(
        (appliedJob) => appliedJob.jobId === job?._id
      );
      setHasApplied(!!appliedJob);
    } catch (error) {
      console.log("Error fetching user profile:", error);
    } finally {
      setIsUserLoading(false);
    }
  };

  // Handle job application
  const handleApply = async () => {
    if (!job) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/recruter/apply/${job._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success(response.data.message);

      // Save application details to context
      setApply((prevApply) => [
        ...prevApply,
        {
          jobId: job._id,
          jobTitle: job.jobTitle,
          company: job.company,
          jobLocation: job.location,
          jobDescription: job.jobDescription,
        },
      ]);

      setHasApplied(true); // Update the state to show "Already Applied"
    } catch (error) {
      console.log("Error applying for job:", error);
      toast.error("An error occurred while applying for the job.");
    }
  };

  // Fetch job details and user profile
  useEffect(() => {
    fetchJobDetails();
  }, [slug]);

  useEffect(() => {
    fetchUserProfile();
  }, [auth, job]);

  // Show spinner while loading
  if (!job || isUserLoading) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 to-purple-200">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 flex justify-center items-center py-12 px-6">
      <div className="w-full bg-white shadow-lg rounded-lg p-8">
        {/* Job Header */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              {job.jobTitle}
            </h1>
            <p className="text-lg text-gray-500">{job.company}</p>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FaBriefcase className="text-green-500" />
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <BsClockHistory className="text-orange-500" />
            <span>{job.experienceLevel}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FaMoneyBillWave className="text-yellow-500" />
            <span>${job.salary.toLocaleString()} per year</span>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Job Description
          </h2>
          <p className="text-gray-700">{job.jobDescription}</p>
        </div>

        {/* Required Skills */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Required Skills
          </h2>
          <ul className="flex flex-wrap gap-4">
            {job.skills[0].split(",").map((skill, index) => (
              <li
                key={index}
                className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full text-sm transition-all hover:bg-blue-300"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleApply}
            disabled={hasApplied || !auth?.user}
            className={`px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              hasApplied
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : auth?.user
                ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {hasApplied
              ? "Already Applied"
              : auth?.user
              ? "Apply Now"
              : "Login to Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
