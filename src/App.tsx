import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

const EditNote = lazy(async () => await import("./pages/EditNote"));
const Home = lazy(async () => await import("./pages/Home"));
const Loading = lazy(async () => await import("./pages/Loading"));
const NewNote = lazy(async () => await import("./pages/NewNote"));
const ShowNote = lazy(async () => await import("./pages/ShowNote"));
// const Navbars = lazy(async () => await import("./components/Navbar"));

export default function App(): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <Suspense fallback={<Loading />}>
      {/* {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbars />
      )} */}
      <Container className="my-4">
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
      </Container>
    </Suspense>
  );
}
