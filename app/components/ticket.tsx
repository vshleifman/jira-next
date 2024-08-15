"use client";

import {useRef} from "react";
import {Data} from "../api/tickets/route";
import {useDragAndDropStore} from "../store";

const Ticket = ({ticket, cellId}: {ticket?: Data; cellId: string}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleDialog = () => {
    dialogRef.current?.hasAttribute("open")
      ? dialogRef.current?.close()
      : dialogRef.current?.showModal();
  };

  const summaryText = ticket?.summary;

  const {setSourceCellId, setTargetTicketId} = useDragAndDropStore();
  return (
    <>
      {!ticket ? (
        <div className="min-h-28 rounded-lg border border-black bg-white p-2 opacity-50 shadow-lg hover:bg-sky-300"></div>
      ) : (
        <div
          id={String(ticket.id)}
          className="rounded-lg border border-black bg-white p-2 shadow-lg hover:bg-sky-300"
          onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
            setSourceCellId?.(cellId);
            setTargetTicketId?.(e.currentTarget.id);
          }}
          draggable={true}
        >
          <dialog
            className="h-1/2 w-1/2 rounded-lg border-2 border-black p-2"
            ref={dialogRef}
            onClick={(e) => {
              e.target === e.currentTarget && toggleDialog();
            }}
          >
            <div className="flex h-full flex-col justify-between gap-3">
              <span>{ticket.title}</span>
              <span>{summaryText}</span>
              <span>{ticket.id}</span>
            </div>
          </dialog>
          <div
            className="flex h-full flex-col justify-between gap-3"
            onClick={() => {
              dialogRef.current?.showModal();
            }}
          >
            <span>{ticket.title}</span>
            <span>
              {summaryText!.length > 40
                ? `${summaryText?.substring(0, 40)}...`
                : summaryText}
            </span>
            <span>{ticket.id}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Ticket;
