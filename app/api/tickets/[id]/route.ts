import {NextRequest, NextResponse} from "next/server";
import {mockData} from "../../mockData";

export const PUT = async (
  request: NextRequest,
  {params}: {params: {id: number}}
) => {
  const {id} = params;
  const {targetStatus, targetEpic} = await request.json();
  const ticketToUpdate = mockData.find((ticket) => ticket.id == id);
  if (!ticketToUpdate) {
    return NextResponse.error();
  }
  ticketToUpdate["status"] = targetStatus;
  ticketToUpdate["epic"] = targetEpic;
  return NextResponse.json("success");
};
