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
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const team = await queryFulfilled;
        console.log(team);
        try {
          if (team.data) {
            dispatch(updateTeam(team.data));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useAddTeamsMutation, useGetTeamsQuery } = teamsApi;
