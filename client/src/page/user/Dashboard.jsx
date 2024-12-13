import React from "react";
import Navbar from "./Navbar";

const UserDashboard = () => {
  return (
    <div className="flex justify-center items-start p-10 bg-gray-50 ">
      <div className="flex shadow-lg rounded-lg overflow-hidden bg-white min-h-[28rem] w-[82rem]">
        <Navbar />
      </div>
    </div>
  );
};

export default UserDashboard;
