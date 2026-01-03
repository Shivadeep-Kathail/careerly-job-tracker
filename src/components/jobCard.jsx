const JobCard = ({job}) => {
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
      </div>
    </>
  );
};

export default JobCard;
