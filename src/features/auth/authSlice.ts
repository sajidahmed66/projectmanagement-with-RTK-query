import { createSlice } from "@reduxjs/toolkit";

export interface authState {
  accessToken: string | undefined;
  user:
    | {
        email: string;
        id: string;
        name: string;
      }
    | undefined;
}

const initialState: authState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      // console.log(actio)
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
