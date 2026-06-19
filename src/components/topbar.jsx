import { Plus, Menu } from "lucide-react";
import { COLUMNS } from "../data/columns";
import "./topbar.css";

const TopBar = ({ activeFilter, onAddJob, onToggleSidebar }) => {
  const title =
    activeFilter === "all"
      ? "All Applications"
      : COLUMNS.find((c) => c.id === activeFilter)?.title || "Applications";

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="topbar-hamburger" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <Menu size={20} />
        </button>
        <h1 className="topbar-title">{title}</h1>
      </div>

      <div className="topbar-right">
        <button className="topbar-add-btn" onClick={onAddJob}>
          <Plus size={14} strokeWidth={2.5} />
          Add Job
        </button>
      </div>
    </div>
  );
};

export default TopBar;
