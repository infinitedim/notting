import { useOutletContext } from "react-router-dom";

export default function useNote() {
  return useOutletContext();
}
