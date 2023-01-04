/* eslint-disable no-console */
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";

const baseUrl = "http://localhost:5000/api/v1";
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers, { getState }) => {
    headers.set("accept", "application/json");
    const { token } = getState().auth;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});
const baseQueryWithLogout = async (args, api, options) => {
  const result = await baseQuery(args, api, options);
  if (result.error) {
    console.error(result.error);
  }
  if (result.error?.status === 401) {
    api.dispatch(logout());
    return result;
  }
  return result;
};
export default baseQueryWithLogout;
