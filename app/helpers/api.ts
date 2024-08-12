import {Data} from "../api/tickets/route";

export const getTickets: () => Promise<Data[]> = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/tickets", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getLayout: () => Promise<{
  columnsOrderedList: string[];
  rowsOrderedList: string[];
}> = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/layout", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const handleMoveTicket = async (
  ticketId: string,
  targetStatus: string,
  targetEpic: string
) => {
  console.log({ticketId, targetStatus, targetEpic});

  fetch(`http://localhost:3000/api/tickets/${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({targetStatus, targetEpic}),
  });
};

export const handleChangeLayout = async (
  draggedFromIndex: number,
  droppedAtIndex: number,
  initialList: string[]
) => {
  const newList = [...initialList];
  newList.splice(draggedFromIndex, 1, initialList[droppedAtIndex]);
  newList.splice(droppedAtIndex, 1, initialList[draggedFromIndex]);
};
