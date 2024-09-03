import {useMutation, useQueryClient} from "@tanstack/react-query";
import {handleAddRow} from "../helpers/api";
import {useRef, useState} from "react";
import {useDialog} from "../helpers/hooks/useDialog";

const NewRow = () => {
  const queryClient = useQueryClient();

  const addRowMutation = useMutation({
    mutationFn: handleAddRow,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["layout"]}),
  });

  const {dialogRef, toggleDialog} = useDialog();

  const [newRowName, setNewRowName] = useState("");

  return (
    <div className="px-3 py-1">
      <button
        onClick={toggleDialog}
        className="w-full rounded-md bg-blue-100 px-3 py-1 text-justify"
      >
        +
      </button>
      <dialog
        className="rounded-lg border-2 border-black p-2"
        ref={dialogRef}
        onClick={(e) => {
          e.target === e.currentTarget && toggleDialog();
        }}
      >
        <form className="flex flex-col">
          <label htmlFor="rowName">Row Name:</label>
          <input
            className="border-b-2"
            name="rowName"
            type="text"
            id="rowName"
            value={newRowName}
            onChange={(e) => setNewRowName(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              addRowMutation.mutate(newRowName);
              setNewRowName("");
              toggleDialog();
            }}
            className="my-2 rounded-md bg-sky-200 p-2 hover:bg-sky-300"
          >
            Add
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default NewRow;
