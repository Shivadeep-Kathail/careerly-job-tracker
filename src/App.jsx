import { useState, useEffect, useCallback } from "react";
import useJobs from "./hooks/useJobs";
import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";
import Board from "./components/board";
import "./App.css";

function App() {
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openModal = useCallback(() => setIsJobModalOpen(true), []);
  const closeModal = useCallback(() => setIsJobModalOpen(false), []);

  // Global keyboard shortcut: N → open add job modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger when typing in inputs, textareas, selects
      const tag = e.target.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      // Don't trigger when modal is already open
      if (isJobModalOpen) return;

      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        openModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isJobModalOpen, openModal]);

  return (
    <div className={`app-root${sidebarOpen ? " sidebar-open" : ""}`}>
      <Sidebar
        jobs={jobs}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="app-main">
        <TopBar
          activeFilter={activeFilter}
          onAddJob={openModal}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />

        <Board
          jobs={jobs}
          addJob={addJob}
          updateJob={updateJob}
          deleteJob={deleteJob}
          isJobModalOpen={isJobModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          activeFilter={activeFilter}
        />
      </main>
    </div>
  );
}

export default App;
