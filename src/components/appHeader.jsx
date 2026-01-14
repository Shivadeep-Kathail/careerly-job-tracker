import Stat from "./stats";

const AppHeader = ({ onAddJob, stats }) => {
  return (
    <header style={{display:"flex",
                    justifyContent:"space-between",
                    alignItems: "center",
                    padding: "2.5px",
                    borderBottom: "1px solid #d3c7c7ff",}}>
      <div>
        <h3>Careerly</h3>
        <p>Track your job applications effortlessly</p>
      </div>
       <div style={{ display: "flex", gap: "10px", border: "1px solid #d3c7c7ff", padding: "8px" }}>
        <Stat label="Total" value={stats.total} />
        <Stat label="Offer" value={stats.offer} />
        <Stat label="Rejected" value={stats.rejected} />
      </div>
      <div>
        <button onClick={onAddJob}>+ Add Job</button>
      </div>
    </header>
  );
};

export default AppHeader;
