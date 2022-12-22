import { useOutletContext } from "react-router-dom";
import { Note } from "../types/types";

export function useNote(): Note {
  return useOutletContext<Note>();
}
