import { useState } from "react";
import Column from "./column";
import JobModal from "./jobModal";
import NoJobs from "./noJobs";
import { COLUMNS } from "../data/columns";
import useIsMobile from "../hooks/useIsMobile";

const Board = ({
  jobs,
  addJob,
  updateJob,
  deleteJob,
  isJobModalOpen,
  openModal,
  closeModal,
}) => {
  // Stores the job being edited; null means new job
  const [jobToEdit, setJobToEdit] = useState(null);

  // Used to control mobile layout (< 850px)
  const isMobile = useIsMobile(850);

  const handleEditJob = (job) => {
    setJobToEdit(job);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setJobToEdit(null);
  };

  // Updates only the status field for an existing job
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
      {jobs.length === 0 ? (
        <NoJobs onAddJob={openModal} />
      ) : (
        <div
          style={{
            ...styles.board,
            flexDirection: isMobile ? "column" : "row",
            padding: isMobile ? "16px" : "24px",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
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
    alignItems: "stretch",
  },
};
