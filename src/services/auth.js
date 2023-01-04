import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base-query";

const authServices = createApi({
  baseQuery,
  reducerPath: "authServices",
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation, useGetProfileQuery } =
  authServices;
export default authServices;
