import JobCard from "./jobCard";

const Column = ({ column, jobs, onEditJob, onDeleteJob, updateJobStatus }) => {
  // Icon is provided by column config to keep this component generic
  const Icon = column.icon;

  return (
    <div style={styles.column}>
      <div style={styles.header}>
        {Icon && <Icon size={18} color={column.color} />}
        <span style={styles.title}>{column.title}</span>

        <span
          style={{
            ...styles.count,
            background: column.bg,
            color: column.color,
          }}
        >
          {jobs.length}
        </span>
      </div>

      <div style={styles.content}>
        {jobs.length === 0 ? (
          <div style={styles.empty}>No jobs here yet</div>
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

const styles = {
  column: {
    flex: 1,
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(6px)",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  title: {
    fontSize: "20px",
    fontWeight: 500,
  },

  count: {
    marginLeft: "6px",
    padding: "2px 10px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 600,
  },

  content: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  empty: {
    border: "1.5px dashed #d1d5db",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "14px",
  },
};
