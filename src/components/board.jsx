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
  const [jobToEdit, setJobToEdit] = useState(null);
  const isMobile = useIsMobile(850);

  const handleEditJob = (job) => {
    setJobToEdit(job);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setJobToEdit(null);
  };

  const updateJobStatus = (jobId, status) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    updateJob({ ...job, status });
  };

  return (
    <>
      {jobs.length === 0 ? (
        <NoJobs onAddJob={openModal} />
      ) : (
        <div style={isMobile ? mobileBoard : desktopBoard}>
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

/* ================= STYLES ================= */

const desktopBoard = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 270px)",
  gap: "20px",
  padding: "24px",
  justifyContent: "center",
  alignItems: "flex-start",
  maxWidth: "100%",
  boxSizing: "border-box",
};


const mobileBoard = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px",
};
