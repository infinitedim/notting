import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(async () => await import("./pages/Home"));
const NewNote = lazy(async () => await import("./pages/NewNote"));
const EditNote = lazy(async () => await import("./pages/EditNote"));
const Loading = lazy(async () => await import("./pages/Loading"));

export default function App(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/new"
          element={<NewNote />}
        />
        <Route path="/:id">
          <Route
            index
            element={<NewNote />}
          />
          <Route
            path="/edit"
            element={<EditNote />}
          />
        </Route>
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Suspense>
  );
}
