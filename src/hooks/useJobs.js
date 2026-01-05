import { useState } from "react";
import { initialJobs } from "../data/initialJobs";

function useJobs() {
    const [jobs, setJobs]= useState(initialJobs);

    //CREATE
    const addJob=(newjob) =>{ 
        setJobs((prev)=>[...prev,newjob])
    }

    //UPDATE
    const updateJob=(id, updatedJobData ) =>{
        setJobs((prev) => prev.map((job)=> job.id===id? {...job, ...updatedJobData}:job))
    }

    //DELETE
    const deleteJob=(id) => {
        setJobs((prev)=>prev.filter((job)=> job.id !== id))
    }

    return { jobs, addJob, updateJob, deleteJob }
}

export default useJobs;