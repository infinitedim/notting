/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import LocalStorage from "../../utils/storage";

const initialState = {
  token: LocalStorage.get("token") ?? "",
  isAuthenticated: false,
  user: LocalStorage.get("user") ?? {
    name: "",
    email: "",
  },
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => ({
      ...state,
      token: payload,
    }),
    setUser: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
    logout: (state, action) => ({
      ...state,
      token: "",
      isAuthenticated: false,
      user: {
        name: "",
        email: "",
      },
    }),
  },
});
export const { logout, setCredentials, setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
