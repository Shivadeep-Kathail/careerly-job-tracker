import JobCard from "./jobCard";

const Column = ({ column, jobs, onEditJob, onDelete }) => {
  const filteredJobs = jobs.filter((job) => job.status === column.id);

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
        {filteredJobs.length === 0 && (
          <p
            style={{
              color: "#7a7a7a",
              fontSize: "14px",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            No applications yet
          </p>
        )}
        {filteredJobs.map((job) => (
          <div key={job.id} style={{ marginTop: "10px" }}>
            <JobCard
              job={job}
              onEdit={() => onEditJob(job)}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Column;
