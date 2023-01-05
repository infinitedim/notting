import NoteForms from "@/components/NoteForms";
import { NewNoteProps } from "@/types";

export default function NewNote({
  onSubmit,
  availableTags,
  onAddTag,
}: NewNoteProps): JSX.Element {
  return (
    <>
      <h1>New Note</h1>
      <NoteForms
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
