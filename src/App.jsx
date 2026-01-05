import useJobs from "./hooks/useJobs";
import Board from "./components/board";

function App() {
  const { jobs, addJob } = useJobs();
  return <Board jobs={jobs} addJob={addJob} />;
}

export default App;