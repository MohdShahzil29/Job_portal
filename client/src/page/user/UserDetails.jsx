import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Navbar from "./Navbar";
import { useAuth } from "../../context/user";
import axios from "axios";

const UserDetails = () => {
  const [auth] = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  console.log("Applied Jobs Data:", appliedJobs);

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/recruter/get-user-applied/${
          auth.user?.id
        }`,
        {
          headers: {
            "user-email": `${auth.user.email}`,
          },
        }
      );
      setAppliedJobs(response.data.jobs);
    } catch (error) {
      console.error("Error fetching applied jobs:", error.message);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div className="flex p-6 gap-9">
      <Navbar />
      <div className="mt-4 w-full">
        <h1 className="text-2xl font-bold mb-4">My Applied Jobs</h1>
        {appliedJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <p className="text-xl font-semibold text-gray-700 mb-4">
              You haven't applied to any jobs yet. Start your journey today!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Explore Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedJobs.map((application) => {
              const job = application.job; 
              return (
                <div
                  key={application._id}
                  className="border rounded-lg shadow-md p-4 flex flex-col items-start w-[19rem]"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={job.companyLogo}
                      alt={`${job.company} Logo`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-bold">{job.company}</h2>
                      <p className="text-gray-600">{job.jobTitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-2">
                    <span className="font-semibold">Salary:</span> ${job.salary}
                  </p>
                  <p className="text-gray-800 mb-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.location}
                  </p>
                  <p className="text-gray-800 mb-4">
                    <span className="font-semibold">Status:</span>{" "}
                    {application.status}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
