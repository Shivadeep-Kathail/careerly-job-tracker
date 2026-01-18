import useLocalStorage from "./useLocalStorage";

function useJobs() {
  const [jobs, setJobs] = useLocalStorage();

  // Appends a new job entry without mutating existing state
  const addJob = (newjob) => {
    setJobs((prev) => [...prev, newjob]);
  };

  // Replaces a job by id while keeping the rest of the list intact
  const updateJob = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      )
    );
  };

  // Removes a job permanently by id
  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return { jobs, addJob, updateJob, deleteJob };
}

export default useJobs;
