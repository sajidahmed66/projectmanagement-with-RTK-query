import { createSlice } from "@reduxjs/toolkit";
import { ITeams, IteamState } from "./teams.types";

const initialState: IteamState = {
  teams: undefined,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    updateTeam: (state, action) => {
      state.teams = [...(state.teams as ITeams[]), action.payload];
    },
    deleteTeam: (state, action) => {
      state.teams = state.teams?.filter((te) => te?.id !== action.payload.id);
    },
  },
});

export const { setTeams, updateTeam, deleteTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
