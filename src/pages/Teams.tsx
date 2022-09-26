import React from "react";
import logoImage from "../assets/images/makamiIcon.png";
import { Link, useLocation } from "react-router-dom";
const Teams = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
        <img src={logoImage} className="w-10 h-10" />
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
      {/* trams page header */}
      <div className="flex justify-between px-10 mt-6">
        <h1 className="text-2xl font-bold">Teams</h1>
        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
      {/* end of teams page header */}
      {/* dispaly cards as card items in a grid format start */}
      {/* dispaly cards as card items in a grid format start */}
    </div>
  );
};

export default Teams;
