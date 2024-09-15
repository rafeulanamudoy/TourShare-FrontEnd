import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetSingleUserQuery } = authApi;
