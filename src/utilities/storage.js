const STORAGE_KEY= "careerly-jobs";

export const loadJobs=() => {
    try{
        const data= localStorage.getItem(STORAGE_KEY);
        return data? JSON.parse(data):[];
    } catch(err) {
        console.log("Failed to load jobs from storage, ",err);
        return [];
    }
}

export const saveJobs=(jobs) => {
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch(err) {
        console.log("Failed to save job into storage, ",err);
    }
}