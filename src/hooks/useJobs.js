import useLocalStorage from "./useLocalStorage";

function useJobs() {
  const [jobs, setJobs] = useLocalStorage();

  //CREATE
  const addJob = (newjob) => {
    setJobs((prev) => [...prev, newjob]);
  };

  //UPDATE
  const updateJob = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  //DELETE
  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return { jobs, addJob, updateJob, deleteJob };
}

export default useJobs;
