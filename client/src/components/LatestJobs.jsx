import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaSpotify,
  FaPinterestP,
  FaGoogle,
  FaApple,
  FaWhatsapp,
  FaDribbble,
} from "react-icons/fa";

// const jobs = [
//   {
//     id: 1,
//     icon: <FaSpotify size={24} />,
//     title: "Product Manager",
//     type: "Full Time",
//     location: "Glendale, CA",
//     category: "Marketing",
//     salary: "$2,000 - 5,000 / Monthly",
//   },
//   {
//     id: 2,
//     icon: <FaPinterestP size={24} />,
//     title: "Product Designer",
//     type: "Part Time",
//     location: "Glen wood, CA",
//     category: "Designer",
//     salary: "$2,000 - 5,000 / Monthly",
//   },
//   {
//     id: 3,
//     icon: <FaGoogle size={24} />,
//     title: "Recruiting Coordinator",
//     type: "Part Time",
//     location: "Tropico, CA",
//     category: "Customers Service",
//     salary: "$2,000 - 5,000 / Monthly",
//   },
//   {
//     id: 4,
//     icon: <FaApple size={24} />,
//     title: "Software Engineer",
//     type: "Part Time",
//     location: "Greenbriar, CA",
//     category: "Developer",
//     salary: "$2,000 - 5,000 / Monthly",
//   },
//   {
//     id: 5,
//     icon: <FaWhatsapp size={24} />,
//     title: "Customer Support",
//     type: "Part Time",
//     location: "Rossmoyne, CA",
//     category: "Support",
//     salary: "$2,000 - 5,000 / Monthly",
//   },
//   {
//     id: 6,
//     icon: <FaDribbble size={24} />,
//     title: "UI/UX Designer",
//     type: "Part Time",
//     location: "Grandview, CA",
//     category: "Designer",
//     salary: "$2,000 - 5,000 / Monthly",
//   },
// ];

const JobCard = ({ job }) => (
  <div className="bg-white shadow-md rounded-lg p-5">
    <div className="flex items-center gap-3">
      <img src={job.companyLogo} alt={job.jobTitle} className="h-[36px]" />
      <div className="font-semibold">{job.jobTitle}</div>
    </div>
    <div className="mt-2 text-gray-500 text-sm">
      <div>{job.status}</div>
      <div>{job.salary}</div>
    </div>
    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
      <span className="bg-gray-100 px-2 py-1 rounded-full">
        {job.employmentType}
      </span>
      <span className="bg-gray-100 px-2 py-1 rounded-full">{job.location}</span>
    </div>
    <button className="mt-5 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
      Job Details
    </button>
  </div>
);

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  console.log("All jobs list:", jobs);
  const handelApi = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/recruter/get-all-job`
      );
      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handelApi();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="bg-gray-50 py-10">
      <div className="w-[87%] mx-auto px-4">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Our Features Jobs</h1>
          <button className="text-sm text-gray-600 hover:text-black flex items-center gap-1">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
