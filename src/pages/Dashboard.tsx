import React from "react";
import logoImage from "../assets/images/makamiIcon.png";
import { Link, useLocation } from "react-router-dom";
import Backlogged from "../components/projects/Backlogged";
import Ready from "../components/projects/Ready";
import Doing from "../components/projects/Doing";
import Review from "../components/projects/Review";
import Blocked from "../components/projects/Blocked";
import Done from "../components/projects/Done";
const Dashboard = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      {/* navbar start */}

      <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
        <img src={logoImage} className="w-10 h-10" />
        <input
          className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
          type="search"
          placeholder="Search for anything…"
        />
        <div className="ml-10">
          <Link
            className={
              pathname === "/teams"
                ? "mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                : "mx-2 text-sm font-semibold text-indigo-700"
            }
            to="/projects"
          >
            Projects
          </Link>
          <Link
            className={
              pathname !== "/teams"
                ? "mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                : "mx-2 text-sm font-semibold text-indigo-700"
            }
            to="/teams"
          >
            Team
          </Link>
        </div>
        <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
          <img
            src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
            alt=""
          />
        </button>
      </div>

      {/* navbar ends */}
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
      </div>
      {/* {details contailer} */}
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
        <Backlogged />
        <Ready />
        <Doing />
        <Review />
        <Blocked />
        <Done />
      </div>
    </div>
  );
};

export default Dashboard;
