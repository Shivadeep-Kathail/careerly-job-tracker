import JobCard from "./jobCard";

const Column = ({ column, jobs, onEditJob, onDelete }) => {
  const filteredJobs = jobs.filter(
    (job) => job.status === column.id
  );
    
  return (
    <>
      <div
        style={{
          width: "20%",
          background: "#f9f9f9",
          padding: "12px",
          borderRadius: "10px",
        }}
      >
        <h3>{column.title}</h3>
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} onEdit={() => onEditJob(job)} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
};

export default Column;
