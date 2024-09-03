"use client";
import {useQuery} from "@tanstack/react-query";
import GridRow from "./components/gridRow";
import {getLayout, getTickets} from "./helpers/api";
import ColumnHeader from "./components/columnHeader";
import NewRow from "./components/newRow";

export default function Home() {
  const {data: tickets} = useQuery({
    queryFn: getTickets,
    queryKey: ["tickets"],
  });

  const {data: layout, isLoading} = useQuery({
    queryFn: getLayout,
    queryKey: ["layout"],
  });

  if (isLoading) return <div>Loading...</div>;

  const {columnsOrderedList, rowsOrderedList} = layout!;

  return (
    <main>
      <div className="grid grid-rows-[min-content_auto] gap-2 border border-solid border-black p-1">
        <ColumnHeader columnsOrderedList={columnsOrderedList} />
        <div
          className="grid gap-3"
          style={{
            gridTemplateRows: `repeat(${rowsOrderedList.length}, auto)`,
          }}
        >
          {rowsOrderedList.map((row, i) => (
            <div key={i} className="rounded px-3 py-1">
              <GridRow
                columnsOrderedList={columnsOrderedList}
                tickets={tickets || []}
                row={row}
              />
            </div>
          ))}
          <NewRow />
        </div>
      </div>
    </main>
  );
}
