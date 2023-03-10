import { EditNoteProps } from "@/types";
import NoteForms from "@/components/NoteForms";
import { useNote } from "@/helpers";

export default function EditNote({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps): JSX.Element {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForms
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
