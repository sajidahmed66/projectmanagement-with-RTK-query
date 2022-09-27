import { apiSlice } from "../api/apiSlice";

const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: `/projects`,
      }),
    }),
    getBackloggedProjects: builder.query({
      query: () => ({
        url: `/projects?status_like=backlog`,
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
  useGetBackloggedProjectsQuery,
} = projectsApi;
