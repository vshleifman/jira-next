"use client";

import {useState} from "react";

const RowHeader = ({row}: {row: string}) => {
  const [draggedFrom, setDraggedFrom] = useState("");
  const [droppedAt, setDroppedAt] = useState("");
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
        // console.log({draggedFrom, droppedAt})
      }}
      className="rounded bg-sky-200 px-5 py-3 hover:bg-sky-500"
    >
      {row}
    </span>
  );
};

export default RowHeader;
