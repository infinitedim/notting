/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { lazy, SetStateAction, Suspense, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import { NoteData, RawNote, Tag } from "./types/types";
import { useLocalStorage } from "./hooks/useLocalStorage";

const EditNote = lazy(async () => await import("./pages/EditNote"));
const Home = lazy(async () => await import("./pages/Home"));
const Loading = lazy(async () => await import("./pages/Loading"));
const NewNote = lazy(async () => await import("./pages/NewNote"));
const ShowNote = lazy(async () => await import("./pages/ShowNote"));
const Navbars = lazy(async () => await import("./components/Navbar"));

export default function App(): JSX.Element {
  const location = useLocation();
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const noteWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes: RawNote[] | SetStateAction<RawNote[]>) => {
      return [
        ...prevNotes,
        {
          ...data,
          id: uuidV4(),
          tagIds: tags.map((tag) => tag.id),
        },
      ];
    });
  }

  function addTag(tags: Tag) {
    setTags((prevTags) => [...prevTags, tags]);
  }

  return (
    <Suspense fallback={<Loading />}>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbars />
      )}
      <Container className="my-4">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
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
