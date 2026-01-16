import { useState } from "react";
import Column from "./column";
import JobModal from "./jobModal";
import NoJobs from "./noJobs";
import { COLUMNS } from "../data/columns";

const Board = ({
  jobs,
  addJob,
  updateJob,
  deleteJob,
  isJobModalOpen,
  openModal,
  closeModal,
}) => {
  const [jobToEdit, setJobToEdit] = useState(null);

  const handleEditJob = (job) => {
    setJobToEdit(job);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setJobToEdit(null);
  };

  // ✅ SAFE status update
  const updateJobStatus = (jobId, status) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    updateJob({
      ...job,
      status,
    });
  };

  return (
    <>
      {/* CONTENT */}
      {jobs.length === 0 ? (
        <NoJobs onAddJob={openModal} />
      ) : (
        <div style={styles.board}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              jobs={jobs.filter((job) => job.status === column.id)}
              onEditJob={handleEditJob}
              onDeleteJob={deleteJob}
              updateJobStatus={updateJobStatus}
            />
          ))}
        </div>
      )}

      {/* MODAL */}
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

const styles = {
  board: {
    display: "flex",
    gap: "16px",
    padding: "24px",
    alignItems: "flex-start",
  },
};
