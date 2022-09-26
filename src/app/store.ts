import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import AuthReducer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: AuthReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
