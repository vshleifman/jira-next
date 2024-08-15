"use client";
import {useQuery} from "@tanstack/react-query";
import GridRow from "./components/gridRow";
import {getLayout, getTickets} from "./helpers/api";

export default function Home() {
  const {data: tickets} = useQuery({
    queryFn: async () => await getTickets(),
    queryKey: ["tickets"],
  });

  const {data: layout, isLoading} = useQuery({
    queryFn: async () => await getLayout(),
    queryKey: ["layout"],
  });

  if (isLoading) return <div>Loading...</div>;

  const {columnsOrderedList, rowsOrderedList} = layout!;
  return (
    <main>
      <div className="grid grid-rows-[min-content_auto] gap-2 border border-solid border-black p-1">
        <div
          className={`grid gap-3 p-3`}
          style={{
            gridTemplateColumns: `repeat(${columnsOrderedList.length}, 1fr)`,
          }}
        >
          {columnsOrderedList.map((col, i) => (
            <div key={i} className="rounded bg-cyan-400 px-3 py-1">
              {col}
            </div>
          ))}
        </div>
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
        </div>
      </div>
    </main>
  );
}
