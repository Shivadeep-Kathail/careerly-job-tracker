import { useState } from "react";
import Column from "./column";
import JobModal from "./jobModal";
import NoJobs from "./noJobs";
import { COLUMNS } from "../data/columns";
import "./board.css";

const Board = ({
  jobs,
  addJob,
  updateJob,
  deleteJob,
  isJobModalOpen,
  openModal,
  closeModal,
  activeFilter,
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

  const updateJobStatus = (jobId, status) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    updateJob({ ...job, status });
  };

  const isFiltered = activeFilter !== "all";
  const columnsToShow = isFiltered
    ? COLUMNS.filter((c) => c.id === activeFilter)
    : COLUMNS;

  return (
    <>
      {jobs.length === 0 ? (
        <NoJobs onAddJob={openModal} />
      ) : (
        <div className={`board${isFiltered ? " board--filtered" : ""}`}>
          {columnsToShow.map((column) => (
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
