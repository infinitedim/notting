import NoteForms from "../components/NoteForms";

export default function NewNote({ onSubmit, availableTags, onAddTag }) {
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
