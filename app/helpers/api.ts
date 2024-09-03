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
  try {
    await fetch(`http://localhost:3000/api/tickets/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({targetStatus, targetEpic}),
    });
  } catch (error) {
    console.log({error});
  }
};

export const handleChangeLayout = async ({
  direction,
  draggedFrom,
  droppedAt,
}: {
  direction: string;
  draggedFrom: string;
  droppedAt: string;
}) => {
  try {
    await fetch("http://localhost:3000/api/layout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        direction,
        draggedFrom,
        droppedAt,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const handleAddRow = async (rowName: string) => {
  try {
    await fetch("http://localhost:3000/api/layout/row", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({rowName}),
    });
  } catch (error) {
    console.error(error);
  }
};

export const handleAddColumn = async (columnName: string) => {
  try {
    await fetch("http://localhost:3000/api/layout/column", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({columnName}),
    });
  } catch (error) {
    console.error(error);
  }
};
