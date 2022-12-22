/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { lazy, Suspense, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import { NoteData, RawNote, Tag } from "./types/types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { NoteLayout } from "./layout/NoteLayout";

const ArchivedNotes = lazy(async () => await import("./pages/ArchivedNotes"));
const EditNote = lazy(async () => await import("./pages/EditNote"));
const NoteList = lazy(async () => await import("./pages/NoteList"));
const Loading = lazy(async () => await import("./pages/Loading"));
const NewNote = lazy(async () => await import("./pages/NewNote"));
const Note = lazy(async () => await import("./pages/Note"));
const Navbars = lazy(async () => await import("./components/Navbar"));

export default function App(): JSX.Element {
  const location = useLocation();
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes?.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
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
          <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
            <Route
              index
              element={<Note onDelete={onDeleteNote} />}}
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
            path="/archive"
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
