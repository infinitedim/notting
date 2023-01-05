import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorage } from "@/utils";

type AuthSliceTypes = {
  token: string;
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  };
};

const initialState: AuthSliceTypes = {
  token: LocalStorage.get<string>("token") ?? "",
  isAuthenticated: false,
  user: LocalStorage.get<AuthSliceTypes["user"]>("user") ?? {
    name: "",
    email: "",
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      token: payload,
    }),
    setUser: (state, { payload }: PayloadAction<AuthSliceTypes["user"]>) => ({
      ...state,
      user: payload,
    }),
    logout: (state, action: PayloadAction) => ({
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
