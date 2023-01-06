import { createApi } from "@reduxjs/toolkit/query/react";
import {
  HttpResponse,
  UserLoginRequestBodyTypes,
  UserLoginResponseTypes,
  UserRegisterRequestBodyTypes,
} from "@/types";

import baseQuery from "./base-query";

const authServices = createApi({
  baseQuery,
  reducerPath: "authServices",
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    register: builder.mutation<
      HttpResponse<unknown>,
      UserRegisterRequestBodyTypes
    >({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<
      HttpResponse<UserLoginResponseTypes>,
      UserLoginRequestBodyTypes
    >({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query<
      HttpResponse<{ name: string; email: string }>,
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      void
    >({
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
