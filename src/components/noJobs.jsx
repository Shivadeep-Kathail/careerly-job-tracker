const NoJobs = ({ onAddJob }) => {
  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h3>No applications yet</h3>

      <div style={{ color: "#5c5b5bff" }}>
        <p>Start tracking your job applications by adding your first one.</p>
        <p>Keep all your opportunities organized in one place.</p>
      </div>

      <button onClick={onAddJob}>Add Your First Job</button>
    </div>
  );
};

export default NoJobs;
