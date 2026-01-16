import JobCard from "./jobCard";

const Column = ({ column, jobs, onEditJob, onDeleteJob, updateJobStatus }) => {
  const Icon = column.icon;

  return (
    <div
      style={{
        flex: 1,
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(6px)",
        borderRadius: "16px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {Icon && <Icon size={18} color={column.color} />}
        <span style={{ fontSize: "18px", fontWeight: 500 }}>
          {column.title}
        </span>
        <span
          style={{
            marginLeft: "6px",
            padding: "2px 10px",
            borderRadius: "999px",
            background: column.bg,
            color: column.color,
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {jobs.length}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {jobs.length === 0 ? (
          <div
            style={{
              border: "1px dashed #d1d5db",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              color: "#9ca3af",
            }}
          >
            No applications yet
          </div>
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
