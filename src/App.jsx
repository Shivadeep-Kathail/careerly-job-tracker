import useJobs from "./hooks/useJobs";
import Board from "./components/board";

function App() {
  const { jobs, addJob, updateJob } = useJobs();
  return <Board jobs={jobs} addJob={addJob} updateJob={updateJob} />;
}

export default App;