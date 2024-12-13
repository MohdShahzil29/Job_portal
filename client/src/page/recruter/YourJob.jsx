import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const JobCard = ({ job }) => {
  const [status, setStatus] = useState("Open");

  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <div className="flex items-center gap-3">
        <img src={job.companyLogo} alt={job.jobTitle} className="h-[36px]" />
        <div className="font-semibold">{job.jobTitle}</div>
      </div>
      <div className="mt-2 text-gray-500 text-sm">
        <div>{job.status}</div>
        <div>{job.salary} / Monthly </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
        <span className="bg-gray-100 px-2 py-1 rounded-full">
          {job.employmentType}
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded-full">
          {job.location}
        </span>
      </div>
      <div className="mt-5">
        <select
          value={job}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-gray-100 py-2 px-3 rounded-lg border border-gray-300"
        >
          <option value="Open">Open</option>
          <option value="Close">Close</option>
        </select>
      </div>
    </div>
  );
};

const YourJob = () => {
  const [jobs, setJobs] = useState([]);
  // console.log("All jobs list:", jobs);
  const handelApi = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/recruter/your-job`
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
    <div className="flex justify-between">
      <div className="ml-10">
        <Navbar />
      </div>
      <div className="py-10 relative right-[8rem]">
        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mr-16">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourJob;
