import { lazy, Suspense, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "./hooks/useLocalStorage";
import NoteLayout from "./layout/NoteLayout";

const ArchivedNotes = lazy(() => import("./pages/ArchivedNotes"));
const EditNote = lazy(() => import("./pages/EditNote"));
const NoteList = lazy(() => import("./pages/NoteList"));
const Loading = lazy(() => import("./pages/Loading"));
const NewNote = lazy(() => import("./pages/NewNote"));
const Note = lazy(() => import("./pages/Note"));
const Navbars = lazy(() => import("./components/Navbar"));

export default function App() {
  const location = useLocation();
  const [notes, setNotes] = useLocalStorage("NOTES", []);
  const [tags, setTags] = useLocalStorage("TAGS", []);

  const notesWithTags = useMemo(
    () =>
      notes?.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [notes, tags],
  );

  function onCreateNote({ tags, ...data }) {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
    ]);
  }

  function addTag(tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onUpdateNote(id, { tags, ...data }) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        }
        return note;
      }),
    );
  }

  function onDeleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function updateTag(id, label) {
    setTags((prevTags) =>
      prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        }
        return tag;
      }),
    );
  }

  function deleteTag(id) {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
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
            element={
              <NoteList
                notes={notesWithTags}
                availableTags={tags}
                onUpdateTag={updateTag}
                onDeleteTag={deleteTag}
              />
            }
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
          <Route
            path="/:id"
            element={<NoteLayout notes={notesWithTags} />}
          >
            <Route
              index
              element={<Note onDelete={onDeleteNote} />}
            />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
          <Route
            path="/archived"
            element={<ArchivedNotes />}
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Container>
    </Suspense>
  );
}
