import useJobs from "./hooks/useJobs";
import Board from "./components/board";

function App() {
  const { jobs } = useJobs();
  return <Board jobs={jobs} />;
}

export default App;