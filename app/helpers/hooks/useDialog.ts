import {useRef} from "react";

export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleDialog = () => {
    dialogRef.current?.hasAttribute("open")
      ? dialogRef.current?.close()
      : dialogRef.current?.showModal();
  };
  return {dialogRef, toggleDialog};
};
