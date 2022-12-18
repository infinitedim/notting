import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const EditNote = lazy(async () => await import("./pages/EditNote"));
const Home = lazy(async () => await import("./pages/Home"));
const Loading = lazy(async () => await import("./pages/Loading"));
const NewNote = lazy(async () => await import("./pages/NewNote"));
const ShowNote = lazy(async () => await import("./pages/ShowNote"));

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
            element={<ShowNote />}
          />
          <Route
            path="edit"
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
