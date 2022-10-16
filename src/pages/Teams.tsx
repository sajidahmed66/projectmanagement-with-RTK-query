import React, { useState } from "react";
import logoImage from "../assets/images/makamiIcon.png";
import { Link, useLocation } from "react-router-dom";
import TeamsModal from "../components/teams/TeamsModal";
import TeamsCard from "../components/teams/TeamsCard";
import AddMembersModal from "../components/teams/AddmembersModal";
import ViewMembersModal from "../components/teams/ViewMembersModal";
import {
  useGetTeamsQuery,
  useAddTeamsMutation,
} from "../features/teams/teamsApi";
import { useAppSelector } from "../app/hooks";
import { ITeams, IUser } from "../features/teams/teams.types";
const Teams = () => {
  const { pathname } = useLocation();
  const { user: loggedinUser } = useAppSelector((state) => state.auth);
  //modal state
  const [opened, setOpened] = useState(false);
  const [toggleAddMembersModal, setToggleAddMembersModal] = useState(false);
  const [toggleViewMembersModal, setToggleViewMembersModal] = useState(false);
  // query state
  const { data: teamsList, isLoading, isSuccess } = useGetTeamsQuery({});

  // modal controls
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };
  const controlAddMembersModal = () => {
    setToggleAddMembersModal((prevState) => !prevState);
  };
  const controlViewMembersModal = () => {
    setToggleViewMembersModal((prevState) => !prevState);
  };

  // content conditionally loading
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
      (
        teams: {
          name: string;
          title: string;
          color: string;
          members: IUser[] | undefined;
        },
        index
      ) => (
        <TeamsCard
          key={index}
          name={teams.name}
          title={teams.title}
          color={teams.color}
          members={teams.members}
          controlAddMembersModal={controlAddMembersModal}
          controlViewMembersModal={controlViewMembersModal}
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
      </div>
      {/* dispaly cards as card items in a grid format start */}
      <TeamsModal open={opened} control={controlModal} />

      <AddMembersModal
        open={toggleAddMembersModal}
        control={controlAddMembersModal}
      />

      <ViewMembersModal
        open={toggleViewMembersModal}
        control={controlViewMembersModal}
      />
    </div>
  );
};

export default Teams;
