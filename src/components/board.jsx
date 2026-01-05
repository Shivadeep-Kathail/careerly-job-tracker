import Column from "./column";
import JobModal from "./jobModal";
import { COLUMNS } from "../data/columns";
import { useState } from "react";

const Board = ({ jobs, addJob }) => {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsJobModalOpen(true)}>
        + Add Job
      </button>

      <div style={{ display: "flex", gap: "16px", padding: "24px" }}>
        {COLUMNS.map((column) => (
          <Column key={column.id} column={column} jobs={jobs} />
        ))}
      </div>

      <JobModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        addJob={addJob}
      />
    </>
  );
};

export default Board;
