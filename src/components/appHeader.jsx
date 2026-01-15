import Stat from "./stats";

const AppHeader = ({ onAddJob, stats, jobs=[] }) => {

  const hasJobs = jobs.length > 0;

  return (
    <header style={{display:"flex",
                    justifyContent:"space-between",
                    alignItems: "center",
                    padding: "2.5px",
                    borderBottom: "1px solid #d3c7c7ff",}}>
      <div>
        <h2>Careerly</h2>
        <p>Track your job applications effortlessly</p>
      </div>
       {hasJobs&& (<div style={{ display: "flex", gap: "10px", border: "1px solid #d3c7c7ff", padding: "8px" }}>
        <Stat label="Total" value={stats.total} />
        <Stat label="Interview" value={stats.interview} />
        <Stat label="Offer" value={stats.offer} />
      </div>)}
      <div>
        <button onClick={onAddJob}>+ Add Job</button>
      </div>
    </header>
  );
};

export default AppHeader;
