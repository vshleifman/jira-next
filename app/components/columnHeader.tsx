import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useDragAndDropStore} from "../store";
import {handleChangeLayout} from "../helpers/api";

const ColumnHeader = ({columnsOrderedList}: {columnsOrderedList: string[]}) => {
  const {draggedFrom, droppedAt, setDraggedFrom, setDroppedAt} =
    useDragAndDropStore();

  const queryClient = useQueryClient();

  const layoutMutation = useMutation({
    mutationFn: handleChangeLayout,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["layout"]}),
  });
  return (
    <div
      className={`grid gap-3 p-3`}
      style={{
        gridTemplateColumns: `repeat(${columnsOrderedList.length}, 1fr)`,
      }}
    >
      {columnsOrderedList.map((col, i) => (
        <div
          id={col}
          key={i}
          draggable={true}
          onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
            setDraggedFrom(e.currentTarget.id);
          }}
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setDroppedAt(e.currentTarget.id);
          }}
          onDrop={(e: React.DragEvent<HTMLDivElement>) => {
            if (
              columnsOrderedList.includes(draggedFrom) &&
              columnsOrderedList.includes(droppedAt)
            ) {
              layoutMutation.mutate({
                direction: "column",
                draggedFrom,
                droppedAt,
              });
            }
          }}
          className="rounded bg-cyan-400 px-3 py-1"
        >
          {col}
        </div>
      ))}
    </div>
  );
};

export default ColumnHeader;
