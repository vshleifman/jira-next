import {NextResponse} from "next/server"
import {mockData} from "../mockData"

export interface Data {
  title: string
  summary: string
  epic: string
  status: string
  id: number
}

export const GET = async () => {
  return NextResponse.json(mockData)
}

// export const POST = async (request) => {

// }
