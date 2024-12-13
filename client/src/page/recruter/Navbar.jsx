import React from "react";
import { FaUser, FaPlus, FaList, FaMap } from "react-icons/fa";
import { Link } from "react-router-dom";

const navbarMenu = [
  { id: 1, name: "Your Details", link: "/recruter/your-details", icon: <FaUser /> },
  { id: 2, name: "Create Job", link: "/recruter/create-job", icon: <FaPlus /> },
  { id: 3, name: "Posted Jobs", link: "/recruter/posted-job", icon: <FaList /> },
  { id: 5, name: "Status", link: "/recruter/status", icon: <FaMap /> },
];

const Navbar = () => {
  return (
    <div className=" bg-black text-white w-[15rem] h-full min-h-[28rem] border-r border-gray-700">
      <nav className="flex flex-col p-5 space-y-4">
        {navbarMenu.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="text-md">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
