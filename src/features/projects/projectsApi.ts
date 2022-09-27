import { apiSlice } from "../api/apiSlice";

const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: `/projects`,
      }),
    }),
    addProject: builder.mutation({
      query: (data) => ({
        url: `/projects`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
