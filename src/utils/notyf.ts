import { Notyf } from "notyf";

export const toast = new Notyf({
  duration: 4000,
  position: {
    x: "center",
    y: "top",
  },
  dismissible: true,
});
