import Column from "./column";
import JobModal from "./jobModal";
import { COLUMNS } from "../data/columns";
import { useState } from "react";

const Board = ({ jobs, addJob, updateJob, deleteJob }) => {
  const [jobToEdit, setJobToEdit] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const handleEditJob = (job) => {
    setJobToEdit(job);
    setIsJobModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsJobModalOpen(false);
    setJobToEdit(null);
  };

  return (
    <>
      <button onClick={() => setIsJobModalOpen(true)}>+ Add Job</button>

      <div style={{ display: "flex", gap: "16px", padding: "24px" }}>
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            jobs={jobs}
            onEditJob={handleEditJob}
            onDelete={deleteJob}
          />
        ))}
      </div>

      <JobModal
        isOpen={isJobModalOpen}
        onClose={handleCloseModal}
        addJob={addJob}
        updateJob={updateJob}
        jobToEdit={jobToEdit}
      />
    </>
  );
};

export default Board;
