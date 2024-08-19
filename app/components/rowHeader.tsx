import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useDragAndDropStore} from "../store";
import {getLayout, handleChangeLayout} from "../helpers/api";

const RowHeader = ({row}: {row: string}) => {
  const {draggedFrom, droppedAt, setDraggedFrom, setDroppedAt} =
    useDragAndDropStore();
  const {data: layout} = useQuery({
    queryFn: getLayout,
    queryKey: ["layout"],
  });

  const {rowsOrderedList} = layout!;

  const queryClient = useQueryClient();

  const layoutMutation = useMutation({
    mutationFn: handleChangeLayout,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["layout"]}),
  });

  return (
    <span
      id={row}
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
          rowsOrderedList.includes(draggedFrom) &&
          rowsOrderedList.includes(droppedAt)
        ) {
          layoutMutation.mutate({direction: "row", draggedFrom, droppedAt});
        }
      }}
      className="rounded bg-sky-200 px-5 py-3 hover:bg-sky-500"
    >
      {row}
    </span>
  );
};

export default RowHeader;
