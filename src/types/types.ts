export type Note = {
  id: string;
} & NoteData;

export interface RawNote {
  id: string;
}

export interface RawNoteData {
  title: string;
  markdown: string;
  tagIds: string;
}

export interface NoteData {
  title: string;
  markdown: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  label: string;
}

export interface NoteFormProps {
  onSubmit: (data: NoteData) => void;
}
