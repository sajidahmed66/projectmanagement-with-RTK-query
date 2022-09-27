import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getUser: builder.query({
    //   query: (email: string) => ({
    //     url: `/users?email=${email}`,
    //   }),
    // }),
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
