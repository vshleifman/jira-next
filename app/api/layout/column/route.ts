import {NextRequest, NextResponse} from "next/server";
import {statusList, updateColumns} from "../../mockData";

export const PUT = async (request: NextRequest) => {
  const {columnName} = await request.json();
  updateColumns([...statusList, columnName]);
  return NextResponse.json("success");
};
