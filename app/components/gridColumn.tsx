"use client";

import {useState} from "react";
import Ticket from "./ticket";
import {Data} from "../api/tickets/route";
import {useRouter} from "next/navigation";
import {handleMoveTicket} from "../helpers/api";
import {useRef} from "react";

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
  const [sourceCell, setSourceCell] = useState("");
  const [ticketPreview, setTicketPreview] = useState(false);

  const router = useRouter();

  const cellId = `${row}-${col}`;
  return (
    <div
      id={cellId}
      className="grid h-full min-h-32 gap-3 rounded-lg bg-sky-100 px-2 py-[10px]"
      onDrop={(e) => {
        const [targetEpic, targetStatus] = targetCell.current.split("-");
        const transferData = e.dataTransfer.getData("ticketMove");

        if (!transferData) return;
        const {targetTicketId, sourceCellId} = JSON.parse(transferData);
        if (targetCell !== sourceCellId) {
          handleMoveTicket(targetTicketId, targetStatus, targetEpic);
          router.refresh();
        }
        setTicketPreview(false);
      }}
      onDragOverCapture={(e) => {
        e.preventDefault();
        // e.stopPropagation();
        // console.log({
        //   sourceCell,
        // })
        console.log({sourceCell, cellId});
        sourceCell !== cellId && setTicketPreview(true);
        targetCell.current = e.currentTarget.id;
      }}
      onDragLeave={() => {
        setTicketPreview(false);
      }}
    >
      {cellId}
      {tickets.map((ticket, i) => {
        if (ticket.epic !== row) return null;
        return (
          <Ticket
            cellId={cellId}
            key={i}
            ticket={ticket}
            setSourceCell={setSourceCell}
          />
        );
      })}

      {ticketPreview && <Ticket cellId={cellId} />}
    </div>
  );
};

export default GridColumn;
