import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRef, useState} from "react";
import {handleAddColumn} from "../helpers/api";
import {useDialog} from "../helpers/hooks/useDialog";

const NewColumn = () => {
  const queryClient = useQueryClient();

  const addColumnMutation = useMutation({
    mutationFn: handleAddColumn,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["layout"]}),
  });

  const {dialogRef, toggleDialog} = useDialog();

  const [newColumnName, setNewColumnName] = useState("");

  return (
    <>
      <button onClick={toggleDialog} className="rounded-md bg-sky-500 px-2">
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
          <label htmlFor="columnName">Column Name:</label>
          <input
            className="border-b-2"
            type="text"
            id="columnName"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              addColumnMutation.mutate(newColumnName);
              setNewColumnName("");
              toggleDialog();
            }}
            className="my-2 rounded-md bg-sky-200 p-2 hover:bg-sky-300"
          >
            Add
          </button>
        </form>
      </dialog>
    </>
  );
};

export default NewColumn;
