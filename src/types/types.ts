export type Note = {
  id: string;
} & NoteData;

export interface RawNote {
  id: string;
}

export interface RawNoteData {
  title: string | undefined;
  markdown: string | undefined;
  tagIds: string;
}

export interface NoteData {
  title: string | undefined;
  markdown: string | undefined;
  tags: Tag[];
}

export interface Tag {
  id: string;
  label: string;
}

export interface NoteFormProps {
  onSubmit: (data: NoteData) => void;
}
