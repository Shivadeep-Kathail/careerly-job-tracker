import JobCard from "./jobCard";
import "./column.css";

const Column = ({ column, jobs, onEditJob, onDeleteJob, updateJobStatus }) => {
  const Icon = column.icon;

  return (
    <div className="column">
      <div className="column-header">
        {Icon && <Icon size={15} color={column.color} />}
        <span className="column-title">{column.title}</span>

        <span
          className="column-count"
          style={{ background: column.bg, color: column.color }}
        >
          {jobs.length}
        </span>
      </div>

      <div className="column-content">
        {jobs.length === 0 ? (
          <div className="column-empty">No jobs here yet</div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              column={column}
              onEdit={onEditJob}
              onDelete={onDeleteJob}
              onStatusChange={updateJobStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
