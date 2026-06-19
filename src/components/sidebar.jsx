import { useEffect } from "react";
import { LayoutGrid } from "lucide-react";
import { COLUMNS } from "../data/columns";
import "./sidebar.css";

const Sidebar = ({ jobs, activeFilter, onFilterChange, isOpen, onClose }) => {
  const totalJobs = jobs.length;

  // Close drawer on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const stats = {
    interviews: jobs.filter((j) => j.status === "interview").length,
    offers: jobs.filter((j) => j.status === "offer").length,
  };

  return (
    <>
      <div className={`sidebar-overlay${isOpen ? " visible" : ""}`} onClick={onClose} />

      <aside className={`sidebar${isOpen ? " open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-wordmark">
            careerly<span>.</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {/* All */}
          <button
            className={`sidebar-nav-item${activeFilter === "all" ? " active" : ""}`}
            onClick={() => { onFilterChange("all"); onClose(); }}
          >
            <span className="sidebar-nav-icon">
              <LayoutGrid size={16} />
            </span>
            <span className="sidebar-nav-label">All Applications</span>
            <span className="sidebar-nav-count">{totalJobs}</span>
          </button>

          {/* Per-status */}
          {COLUMNS.map((col) => {
            const Icon = col.icon;
            const count = jobs.filter((j) => j.status === col.id).length;

            return (
              <button
                key={col.id}
                className={`sidebar-nav-item${activeFilter === col.id ? " active" : ""}`}
                onClick={() => { onFilterChange(col.id); onClose(); }}
              >
                <span className="sidebar-nav-icon">
                  <Icon size={16} color={activeFilter === col.id ? undefined : col.color} />
                </span>
                <span className="sidebar-nav-label">{col.title}</span>
                <span className="sidebar-nav-count">{count}</span>
              </button>
            );
          })}
        </nav>

        {/* Stats */}
        {totalJobs > 0 && (
          <div className="sidebar-stats">
            <div className="sidebar-stat">
              <span className="sidebar-stat-value">{totalJobs}</span>
              <span className="sidebar-stat-label">Total</span>
            </div>
            <div className="sidebar-stat">
              <span className="sidebar-stat-value">{stats.interviews}</span>
              <span className="sidebar-stat-label">Interviews</span>
            </div>
            <div className="sidebar-stat">
              <span className="sidebar-stat-value">{stats.offers}</span>
              <span className="sidebar-stat-label">Offers</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
