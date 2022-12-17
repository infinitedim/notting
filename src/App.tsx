import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(async () => await import("./pages/Home"));

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
    </Routes>
  );
}
