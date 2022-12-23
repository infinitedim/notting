import NoteCard from "../components/NoteCard";

export default function ArchivedNotes(): JSX.Element {
  return (
    <div>
      <h1>Archived Notes</h1>
      <NoteCard
        tags={[]}
        title={""}
        id={""}
      />
    </div>
  );
}
