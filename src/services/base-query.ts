import {
  FetchBaseQueryError,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/index";
import { logout } from "@/features/auth";

const baseUrl = "http://localhost:88/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers, { getState }) => {
    headers.set("accept", "application/json");

    const { token } = (getState() as RootState).auth;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});

const baseQueryWithLogout: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, options) => {
  const result = await baseQuery(args, api, options);

  if (result.error != null) {
    console.error(result.error);
  }

  if (result.error?.status === 401) {
    api.dispatch(logout());

    return result;
  }

  return result;
};

export default baseQueryWithLogout;
