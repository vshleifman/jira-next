import {Data} from "../api/tickets/route";
import GridColumn from "./gridColumn";
import RowHeader from "./rowHeader";

const GridRow = ({
  row,
  tickets,
  columnsOrderedList,
}: {
  row: string;
  tickets: Data[];
  columnsOrderedList: string[];
}) => {
  const filterTicketsByStatus = (status: string) => {
    return tickets?.filter((ticket) => ticket.status === status);
  };
  return (
    <div className="grid grid-rows-[min-content_auto] gap-2">
      <RowHeader row={row} />
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${columnsOrderedList.length}, 1fr)`,
        }}
      >
        {columnsOrderedList.map((col, i) => (
          <div key={i}>
            <GridColumn
              col={col}
              row={row}
              tickets={filterTicketsByStatus(col) || []}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridRow;
