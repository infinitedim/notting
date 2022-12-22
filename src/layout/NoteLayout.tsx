import { Navigate, Outlet, useParams } from "react-router-dom";
import { NoteLayoutProps } from "../types/types";

export function NoteLayout({ notes }: NoteLayoutProps): JSX.Element {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (note == null)
    return (
      <Navigate
        to="/"
        replace
      />
    );

  return <Outlet context={note} />;
}
