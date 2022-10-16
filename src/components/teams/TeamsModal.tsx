import React, { SyntheticEvent, useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { useAppSelector } from "../../app/hooks";
import { useGetUsersQuery } from "../../features/user/userApi";
// import { ITeams, IUser } from "../../features/teams/teamsSlice";
import { useAddTeamsMutation } from "../../features/teams/teamsApi";
import { IUser } from "../../features/teams/teams.types";
export interface IModalProps {
  open: boolean;
  control: () => void;
}

const TeamsModal = ({ open, control }: IModalProps) => {
  const [teamName, setTeamName] = useState("");
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [assignedUsers, setAssignedUsers] = useState<IUser[]>([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  const { user: loggedinUser } = useAppSelector((state) => state.auth);
  const { data: users, isSuccess, isError, isLoading } = useGetUsersQuery({});
  const [
    addTeams,
    { data, isSuccess: teamsAddSuccess, isError: teamsAddError },
  ] = useAddTeamsMutation();

  const submitTeamsForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (selectedColor === "") {
      alert("Please select a color for your team");
    } else {
      console.log(teamName, selectedColor, title);
      addTeams({
        name: teamName,
        color: selectedColor,
        title: title,
        members: assignedUsers,
      });
      control();
    }
  };

  const onSelect = (selectedList: any, selectedItem: any) => {
    setAssignedUsers(selectedList);
  };

  const onRemove = (selectedList: any, removedItem: any) => {
    setAssignedUsers(selectedList);
  };

  useEffect(() => {
    if (loggedinUser && loggedinUser.email) {
      setAssignedUsers([loggedinUser]);
    }
  }, [loggedinUser]);
  return open ? (
    <>
      <div
        onClick={control}
        className="fixed inset-0 z-10 w-full h-full cursor-pointer bg-black/50"
      ></div>
      <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Create a Team
        </h2>
        <form
          className="mt-8 space-y-6"
          method="POST"
          onSubmit={submitTeamsForm}
        >
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="to" className="sr-only">
                Name
              </label>
              <input
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Name of the team"
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            {/* <div>
              <label htmlFor="to" className="sr-only">
                assign color
              </label>
              <input
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="select Color"
                // value={to}
                // onChange={(e) => handleEmailWithdebounce(e)}
              />
            </div> */}
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Title/job description"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h2 className="mt-6 text-xl font-extrabold text-center text-gray-900">
              Select Team member
            </h2>
            <div>
              {isSuccess && (
                <Multiselect
                  avoidHighlightFirstOption={true}
                  hidePlaceholder={true}
                  // hideSelectedList={true}
                  options={users.filter(
                    (u: { email: string | undefined }) =>
                      u?.email !== loggedinUser?.email
                  )} // Options to display in the dropdown
                  selectedValues={assignedUsers} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
              )}
            </div>
          </div>
          <h2 className="mt-6 text-xl font-extrabold text-center text-gray-900">
            select a color
          </h2>
          <div className="flex flex-row items-center justify-center w-full h-10 px-3 py-2 my-8">
            {[
              "bg-red-300",
              "bg-yellow-300",
              "bg-violet-300",
              "bg-green-300",
              "bg-teal-300",
              "bg-indigo-300",
              "bg-pink-300",
            ].map((color) => (
              <input
                className={`w-6 h-6 ${color} m-2 rounded-full  cursor-pointer`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create a team task
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <></>
  );
};

export default TeamsModal;
