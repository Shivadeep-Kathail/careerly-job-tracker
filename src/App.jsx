import useJobs from "./hooks/useJobs";
import Board from "./components/board";

function App() {
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  return <Board jobs={jobs} addJob={addJob} updateJob={updateJob} deleteJob={deleteJob} />;
}

export default App;