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
        // i actually forgot why i am doing setTeams here
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
      },
    }),
    updateMembers: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/teams/:${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async ({ id }, { queryFulfilled, dispatch }) => {
        try {
          const { data: updatedTeam } = await queryFulfilled;
          const patchresult = dispatch(
            teamsApi.util.updateQueryData("getTeams", id, (draft) => {
              console.log(draft);
              // update getTeams cache data
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useAddTeamsMutation, useGetTeamsQuery } = teamsApi;
