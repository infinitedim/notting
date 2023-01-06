/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAppSelector } from "@/app/index";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { token } = useAppSelector(({ auth }) => auth);

  return token ? <Outlet /> : <Navigate to="/login" />;
};
