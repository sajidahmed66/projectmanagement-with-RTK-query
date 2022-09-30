import { apiSlice } from "../api/apiSlice";
import { setTeams, updateTeam } from "./teamsSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => ({
        url: `/teams`,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const teams = await queryFulfilled;
        try {
          if (teams?.data.length) {
            dispatch(setTeams(teams.data));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addTeams: builder.mutation({
      query: (data) => ({
        url: `/teams`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async ({ data }, { queryFulfilled, dispatch }) => {
        try {
          const { data: updatedTeam } = await queryFulfilled;
          const patchResult = dispatch(
            teamsApi.util.updateQueryData("getTeams", {}, (draft) => {
              draft.push(updatedTeam);
            })
          );
        } catch (error) {
          console.log(error);
        }

        // const patchResult = dispatch(
        //   teamsApi.util.updateQueryData("getTeams", {}, (draft)=>{

        //   })
        // )
      },
    }),
  }),
});

export const { useAddTeamsMutation, useGetTeamsQuery } = teamsApi;
