import { useState } from "react";
import {
  Trash2,
  SquarePen,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

const STATUS_OPTIONS = [
  { key: "wishlist", label: "Saved" },
  { key: "applied", label: "Applied" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "rejected", label: "Rejected" },
];

const JobCard = ({ job, column, onEdit, onDelete, onStatusChange }) => {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const hasNotes = job.notes?.trim().length > 0;

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${job.role}" at "${job.company}"?`
      )
    ) {
      onDelete(job.id);
    }
  };

  const selectStatus = (status) => {
    onStatusChange(job.id, status);
    setIsOpen(false);
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        border: isHover ? "2px solid #93c5fd" : "2px solid transparent",
        transition: "all 0.2s ease",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
            {job.role}
          </h4>
          <p style={{ marginTop: "6px", fontWeight: 500 }}>
            {job.company}
          </p>
        </div>

        {isHover && (
          <div style={{ display: "flex", gap: "10px" }}>
            <SquarePen size={18} onClick={() => onEdit(job)} />
            <Trash2 size={18} color="#ef4444" onClick={handleDelete} />
          </div>
        )}
      </div>

      {/* Meta */}
      <div style={{ marginTop: "8px", color: "#6b7280", fontSize: "14px" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <MapPin size={14} /> {job.location}
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <Calendar size={14} /> Applied {job.appliedDate}
        </div>
      </div>

      {/* Status + Link */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "12px",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setIsOpen((v) => !v)}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              background: column.bg,
              color: column.color,
              cursor: "pointer",
              display: "flex",
              gap: "6px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {job.status}
            <ChevronDown size={14} />
          </div>

          {isOpen && (
            <div
              style={{
                position: "absolute",
                top: "42px",
                left: 0,
                background: "#5b5b5f",
                borderRadius: "14px",
                padding: "6px",
                width: "160px",
                zIndex: 50,
              }}
            >
              {STATUS_OPTIONS.map((s) => (
                <div
                  key={s.key}
                  onClick={() => selectStatus(s.key)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "10px",
                    background:
                      job.status === s.key ? "#6d9bf1" : "transparent",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {job.status === s.key && "✓ "} {s.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {job.link && (
          <a href={job.link} target="_blank" rel="noreferrer">
            <ExternalLink size={18} color="#9ca3af" />
          </a>
        )}
      </div>

      {hasNotes && (
        <>
          <div
            style={{
              height: "1px",
              background: "#e5e7eb",
              margin: "10px 0",
            }}
          />
          <em style={{ fontSize: "14px", color: "#7e7e7e" }}>
            {job.notes}
          </em>
        </>
      )}
    </div>
  );
};

export default JobCard;
