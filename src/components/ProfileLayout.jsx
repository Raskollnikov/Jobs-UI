import { Outlet } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProfileLayout = () => {
  const [userName] = useState(localStorage.getItem("user") || "");

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen z-10">
      {/* Sidebar */}
      <div className="hidden md:fixed top-0 left-0 h-full w-16 bg-gray-800 text-white md:flex flex-col items-center transition-all duration-300 ease-in-out hover:w-[170px] group">
        <div className="flex flex-col items-center mt-10">
          <div className="bg-blue-500 text-white font-bold text-lg h-12 w-12 flex items-center justify-center rounded-full">
            {userName ? userName[0].toUpperCase() : "U"}
          </div>
          <div className="hidden group-hover:block mt-2 text-center">
            <h1 className="text-lg font-semibold">Welcome</h1>
            <div className="flex items-center justify-center gap-1">
              {userName} <FaHeart color="red" className="mt-1" />
            </div>
            <Link
              to="/profile"
              className="hidden group-hover:block mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              my jobs
            </Link>
            <Link
              to="/profile/add-job"
              className="hidden group-hover:block mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Add New Job
            </Link>
          </div>
        </div>
        <button
          onClick={logOut}
          className="absolute bottom-4 w-[90%] bg-red-500 text-white py-2 px-0 hover:px-4 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-16 p-6">
        <Outlet /> {/* This is where child routes will be rendered */}
      </main>
    </div>
  );
};

export default ProfileLayout;
