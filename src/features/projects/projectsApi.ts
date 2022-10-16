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
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          //  not working
          const { data: addedProjectData } = await queryFulfilled;
          const patchResult = dispatch(
            projectsApi.util.updateQueryData(
              "getBackloggedProjects",
              {},
              (draft) => {
                draft.push(addedProjectData);
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
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
