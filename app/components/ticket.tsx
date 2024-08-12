"use client";

import {Dispatch, SetStateAction, useRef} from "react";
import {Data} from "../api/tickets/route";

const Ticket = ({
  ticket,
  cellId,
  setSourceCell,
}: {
  ticket?: Data;
  cellId: string;
  setSourceCell?: Dispatch<SetStateAction<string>>;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleDialog = () => {
    dialogRef.current?.hasAttribute("open")
      ? dialogRef.current?.close()
      : dialogRef.current?.showModal();
  };

  const summaryText = ticket?.summary;
  return (
    <>
      {!ticket ? (
        <div className="min-h-28 rounded-lg border border-black bg-white p-2 shadow-lg hover:bg-sky-300"></div>
      ) : (
        <div
          id={String(ticket.id)}
          className="rounded-lg border border-black bg-white p-2 shadow-lg hover:bg-sky-300"
          onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
            setSourceCell?.(cellId);
            e.dataTransfer.setData(
              "ticketMove",
              JSON.stringify({
                targetTicketId: e.currentTarget.id,
                sourceCellId: cellId,
              })
            );
          }}
          draggable={true}
        >
          {cellId}
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
            {/* <span>{ticket.title}</span>
            <span>
              {summaryText!.length > 40
                ? `${summaryText?.substring(0, 40)}...`
                : summaryText}
            </span> */}
            <span>{ticket.id}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Ticket;
