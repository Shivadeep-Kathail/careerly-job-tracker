// Single storage key to keep all job data namespaced
const STORAGE_KEY = "careerly-jobs";
const RESUME_TEXT_KEY = "careerly_resume_text";
const RESUME_META_KEY = "careerly_resume_meta";

export const loadJobs = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.log("Failed to load jobs from storage,", err);
    return [];
  }
};

export const saveJobs = (jobs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  } catch (err) {
    console.log("Failed to save jobs into storage,", err);
  }
};

// ── Resume storage ──────────────────────────────────
export const saveResumeText = (text) => {
  try {
    localStorage.setItem(RESUME_TEXT_KEY, text);
  } catch (err) {
    console.error("Failed to save resume text:", err);
    throw new Error("Could not save resume — localStorage may be full.");
  }
};

export const loadResumeText = () => {
  try {
    return localStorage.getItem(RESUME_TEXT_KEY) || "";
  } catch {
    return "";
  }
};

export const saveResumeMeta = (meta) => {
  try {
    localStorage.setItem(RESUME_META_KEY, JSON.stringify(meta));
  } catch (err) {
    console.error("Failed to save resume meta:", err);
  }
};

export const loadResumeMeta = () => {
  try {
    const data = localStorage.getItem(RESUME_META_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const clearResume = () => {
  localStorage.removeItem(RESUME_TEXT_KEY);
  localStorage.removeItem(RESUME_META_KEY);
};
