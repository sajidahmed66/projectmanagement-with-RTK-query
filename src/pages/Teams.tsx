import React, { useState } from "react";
import logoImage from "../assets/images/makamiIcon.png";
import { Link, useLocation } from "react-router-dom";
import TeamsModal from "../components/teams/TeamsModal";
import {
  useGetTeamsQuery,
  useAddTeamsMutation,
} from "../features/teams/teamsApi";
import TeamsCard from "../components/teams/TeamsCard";
import { IUser, ITeams } from "../features/teams/teamsSlice";
import { useAppSelector } from "../app/hooks";
const Teams = () => {
  const { pathname } = useLocation();
  const { user: loggedinUser } = useAppSelector((state) => state.auth);
  const [opened, setOpened] = useState(false);
  const { data: teamsList, isLoading, isSuccess } = useGetTeamsQuery({});

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  let content = null;
  if (isLoading) {
    content = "Loading teams...";
  }
  if (!isLoading && !isSuccess) {
    content = "Failed to load teams...";
  }

  if (loggedinUser && isSuccess && teamsList.length > 0) {
    // teamsList.filter((teams: { members: any }) =>
    //   teams.members.filter(
    //     (m: { email: string }) => m.email === loggedinUser.email
    //   )

    let userSpecificteams: ITeams[] = [];
    teamsList.forEach((t: any) => {
      if (t.members.length > 0) {
        t.members.forEach((member: { email: string }) => {
          if (member.email === loggedinUser.email) {
            userSpecificteams.push(t);
          }
        });
      }
    });

    content = userSpecificteams.map(
      (teams: {
        name: string;
        title: string;
        color: string;
        members: IUser[] | undefined;
      }) => (
        <TeamsCard
          name={teams.name}
          title={teams.title}
          color={teams.color}
          members={teams.members}
        />
      )
    );
  }
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      {/* teams page navbar */}
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
        <button
          className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
          onClick={controlModal}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
      {/* end of teams page header */}
      {/* dispaly cards as card items in a grid format start */}
      <div className="grid grid-cols-1 gap-6 px-10 mt-4 overflow-auto md:grid-cols-3 lg:grid-cols-4">
        {content}
        {/* <div
          className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
          draggable="true"
        >
          <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
            Design
          </span>
          <h4 className="mt-3 text-sm font-medium">
            This is the title of the card for the thing that needs to be done.
          </h4>
          <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-300 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="ml-1 leading-none">Dec 12</span>
            </div>
          </div>
        </div> */}
        {/* <div
          className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
          draggable="true"
        >
          <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          <span className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full">
            Dev
          </span>
          <h4 className="mt-3 text-sm font-medium">
            This is the title of the card for the thing that needs to be done.
          </h4>
          <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-300 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="ml-1 leading-none">Dec 12</span>
            </div>
          </div>
        </div>
        <div
          className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
          draggable="true"
        >
          <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          <span className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full">
            Dev
          </span>
          <h4 className="mt-3 text-sm font-medium">
            This is the title of the card for the thing that needs to be done.
          </h4>
          <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-300 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="ml-1 leading-none">Dec 12</span>
            </div>
          </div>
        </div>
        <div
          className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
          draggable="true"
        >
          <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          <span className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full">
            Dev
          </span>
          <h4 className="mt-3 text-sm font-medium">
            This is the title of the card for the thing that needs to be done.
          </h4>
          <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-300 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="ml-1 leading-none">Dec 12</span>
            </div>
          </div>
        </div> */}
      </div>
      {/* dispaly cards as card items in a grid format start */}
      <TeamsModal open={opened} control={controlModal} />
    </div>
  );
};

export default Teams;
