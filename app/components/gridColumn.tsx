"use client";

import {useState} from "react";
import Ticket from "./ticket";
import {Data} from "../api/tickets/route";
import {handleMoveTicket} from "../helpers/api";
import {useRef} from "react";
import {useDragAndDropStore} from "../store";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const GridColumn = ({
  row,
  col,
  tickets,
}: {
  row: string;
  col: string;
  tickets: Data[];
}) => {
  const targetCell = useRef("");
  const {sourceCellId, targetTicketId, setTargetTicketId, setSourceCellId} =
    useDragAndDropStore();
  const [ticketPreview, setTicketPreview] = useState(false);

  const queryClient = useQueryClient();
  const moveTicketMutation = useMutation({
    mutationFn: async ({
      targetTicketId,
      targetEpic,
      targetStatus,
    }: {
      targetTicketId: string;
      targetStatus: string;
      targetEpic: string;
    }) => await handleMoveTicket(targetTicketId, targetStatus, targetEpic),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
    },
  });

  const cellId = `${row}-${col}`;
  return (
    <div
      id={cellId}
      className="grid h-full min-h-32 gap-3 rounded-lg bg-sky-100 px-2 py-[10px]"
      onDrop={(e) => {
        const [targetEpic, targetStatus] = targetCell.current.split("-");

        if (targetTicketId && targetCell.current !== sourceCellId) {
          moveTicketMutation.mutate({targetTicketId, targetStatus, targetEpic});
        }
        setTicketPreview(false);
        setSourceCellId("");
        setTargetTicketId("");
      }}
      onDragOverCapture={(e) => {
        e.preventDefault();
        targetTicketId && sourceCellId !== cellId && setTicketPreview(true);
        targetCell.current = e.currentTarget.id;
      }}
      onDragLeave={() => {
        setTicketPreview(false);
      }}
    >
      {tickets.map((ticket, i) => {
        if (ticket.epic !== row) return null;
        return <Ticket cellId={cellId} key={i} ticket={ticket} />;
      })}

      {ticketPreview && <Ticket cellId={cellId} />}
    </div>
  );
};

export default GridColumn;
