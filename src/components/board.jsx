import Column from "./column";
import JobModal from "./jobModal";
import { COLUMNS } from "../data/columns";
import { useState } from "react";

const Board = ({ jobs, addJob, updateJob,isJobModalOpen, deleteJob, closeModal, openModal }) => {
  const [jobToEdit, setJobToEdit] = useState(null);

  const handleEditJob = (job) => {
    setJobToEdit(job);
    openModal()
  };

  const handleCloseModal = () => {
    closeModal();
    setJobToEdit(null);
  };

  return (
    <>

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
