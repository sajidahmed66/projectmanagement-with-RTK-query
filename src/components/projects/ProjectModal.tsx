import Multiselect from "multiselect-react-dropdown";
import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useAddProjectMutation } from "../../features/projects/projectsApi";
import { ITeams } from "../../features/teams/teams.types";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";
interface IProjectModal {
  open: boolean;
  control: () => void;
}

const ProjectModal = ({ control, open }: IProjectModal) => {
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState<ITeams>({} as ITeams);
  const { data: teams, isSuccess } = useGetTeamsQuery({});
  const [addProject, { isSuccess: ProjectSuccess }] = useAddProjectMutation();
  const { user: loggedInUser } = useAppSelector((state) => state.auth);
  const onSelect = (selectedList: any, selectedItem: any) => {
    console.log(selectedList);
    setTeam(selectedList[0]);
  };

  const onRemove = (selectedList: any, removedItem: any) => {
    // setAssignedUsers(selectedList);
  };

  const submitProjectsHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addProject({
      title: title,
      team: team,
      createdBy: loggedInUser,
      createdAt: new Date(),
      status: "backlog",
    });
    control();
  };
  return open ? (
    <>
      <div
        onClick={control}
        className="fixed inset-0 z-10 w-full h-full cursor-pointer bg-black/50"
      ></div>
      <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Create a Project
        </h2>
        <form
          className="mt-8 space-y-6"
          method="POST"
          onSubmit={submitProjectsHandler}
        >
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="to" className="sr-only">
                title
              </label>
              <input
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Title of the Project"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h2 className="mt-6 text-xl font-extrabold text-center text-gray-900">
              Assign a Team
            </h2>
            <div>
              {isSuccess && teams.length > 0 && (
                <Multiselect
                  avoidHighlightFirstOption={true}
                  hidePlaceholder={true}
                  // hideSelectedList={true}
                  singleSelect={true}
                  options={teams} // Options to display in the dropdown
                  selectedValues={team} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  //   onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create a Project
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <></>
  );
};

export default ProjectModal;
