import {NextRequest, NextResponse} from "next/server";
import {epicsList, statusList, updateColumns, updateRows} from "../mockData";

export const GET = async () => {
  return NextResponse.json({
    columnsOrderedList: statusList,
    rowsOrderedList: epicsList,
  });
};

export const PUT = async (request: NextRequest) => {
  const {direction, draggedFrom, droppedAt} = await request.json();

  const initialList = direction === "row" ? epicsList : statusList;
  const newOrder = [...initialList];
  const draggedIndex = newOrder.indexOf(draggedFrom);
  const droppedIndex = newOrder.indexOf(droppedAt);

  newOrder.splice(draggedIndex, 1, initialList[droppedIndex]);
  newOrder.splice(droppedIndex, 1, initialList[draggedIndex]);

  direction === "row" ? updateRows(newOrder) : updateColumns(newOrder);
  return NextResponse.json("success");
};
