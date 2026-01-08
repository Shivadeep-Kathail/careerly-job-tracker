import { useState, useEffect } from "react";
import { loadJobs, saveJobs } from "../utilities/storage";

const useLocalStorage=() => {
    const [jobs, setJobs]= useState(()=> loadJobs())

    useEffect(()=> {
        saveJobs(jobs);
    },[jobs]);

    return [jobs, setJobs];
}

export default useLocalStorage;