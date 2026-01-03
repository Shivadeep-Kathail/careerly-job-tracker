import Column from "./column";
import { COLUMNS } from "../data/columns";

const Board = ({ jobs }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "16px",
          padding: "24px",
        }}
      >
        {COLUMNS.map((column) => (
          <Column key={column.id} column={column} jobs={jobs} />
        ))}
      </div>
    </>
  );
};

export default Board;
