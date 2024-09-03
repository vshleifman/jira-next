import {NextRequest, NextResponse} from "next/server";
import {epicsList, updateRows} from "../../mockData";

export const PUT = async (request: NextRequest) => {
  const {rowName} = await request.json();
  updateRows([...epicsList, rowName]);
  return NextResponse.json("success");
};
