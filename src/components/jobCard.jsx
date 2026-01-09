const JobCard = ({job, onEdit, onDelete}) => {
  const handleDelete=() => {
    const confirmDelete= window.confirm(`Are you sure you want to delete "${job.role}" at "${job.company}"?`)
    if(!confirmDelete) return;

    onDelete(job.id);
  }
  return (
    <>
      <div
        style={{
          background: "#fff",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "10px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h4>{job.role}</h4>
        <p>{job.company}</p>
        <small>{job.location}</small>
        <br />
        <small>Applied: {job.appliedDate}</small>
        <button type="button" onClick={onEdit}>Edit</button>
        <button type="button" onClick={handleDelete}>🗑 Delete</button>
      </div>
    </>
  );
};

export default JobCard;
