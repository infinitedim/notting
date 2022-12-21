export type Note = {
  id: string;
} & NoteData;

export interface NoteData {
  title: string | undefined;
  markdown: string | undefined;
  tags: Tag[];
}

export type RawNote = {
  id: string;
} & RawNoteData;

export interface RawNoteData {
  title: string | undefined;
  markdown: string | undefined;
  tagIds: string;
}

export interface Tag {
  id: string;
  label: string;
}

export interface NoteFormProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export interface NewNoteProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}
