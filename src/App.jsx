import { useState } from "react";
import useJobs from "./hooks/useJobs";
import Board from "./components/board";
import AppHeader from "./components/appHeader";
import './App.css'

function App() {
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const stats = {
    total: jobs.length,
    interview: jobs.filter((j) => j.status === "interview").length,
    offer: jobs.filter((j) => j.status === "offer").length,
  };

  return (
    <div className="app-root">
      <AppHeader
        onAddJob={() => setIsJobModalOpen(true)}
        stats={stats}
        jobs={jobs}
      />

      <main className="app-main">
        <Board
          jobs={jobs}
          addJob={addJob}
          updateJob={updateJob}
          deleteJob={deleteJob}
          isJobModalOpen={isJobModalOpen}
          openModal={() => setIsJobModalOpen(true)}
          closeModal={() => setIsJobModalOpen(false)}
        />
      </main>
    </div>
  );
}

export default App;
