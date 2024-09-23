import { baseApi } from "./baseApi";

export const teamApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTeams: build.query({
      query: () => `/team`,
    }),
  }),
});

export const { useGetTeamsQuery } = teamApi;
