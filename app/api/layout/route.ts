import {NextResponse} from "next/server"
import {epicsList, statusList} from "../mockData"

export const GET = async () => {
  return NextResponse.json({
    columnsOrderedList: statusList,
    rowsOrderedList: epicsList,
  })
}
