import { useState, useEffect, useRef } from "react";
import { formatAppliedDate } from "../utilities/date";
import {
  Trash2,
  SquarePen,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

const STATUS_OPTIONS = [
  { key: "wishlist", label: "Wishlist" },
  { key: "applied", label: "Applied" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "rejected", label: "Rejected" },
];

const JobCard = ({ job, column, onEdit, onDelete, onStatusChange }) => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentStatusLabel =
    STATUS_OPTIONS.find((s) => s.key === job.status)?.label || job.status;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${job.role}" at "${job.company}"?`
      )
    ) {
      onDelete(job.id);
    }
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "20px",
        border: "1px solid",
        borderColor: hover ? "#52b7ff" : "#e5e7eb",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover
          ? "0 18px 40px rgba(0,0,0,0.12)"
          : "0 10px 24px rgba(0,0,0,0.08)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        zIndex: open ? 50 : 1,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 500 }}>
            {job.role}
          </h3>
          <p style={{ marginTop: "6px", fontSize: "16px", color: "#374151" }}>
            {job.company}
          </p>
        </div>

        {hover && (
          <div style={{ display: "flex", gap: "12px" }}>
            <SquarePen
              size={18}
              style={{ color: "#9ca3af" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              onClick={() => onEdit(job)}
            />

            <Trash2
              size={18}
              style={{ color: "#9ca3af" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              onClick={handleDelete}
            />
          </div>
        )}
      </div>

      {/* Meta */}
      <div
        style={{
          marginTop: "12px",
          fontSize: "14px",
          color: "#6b7280",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <MapPin size={14} /> {job.location}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Calendar size={14} /> Applied on{" "}
          {formatAppliedDate(job.appliedDate)}
        </div>
      </div>

      {/* Status + External Link */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <div
            onClick={() => setOpen((v) => !v)}
            style={{
              background: column.bg,
              color: column.color,
              padding: "8px 16px",
              borderRadius: "12px",
              fontWeight: 550,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transform: open ? "scale(1.04)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
          >
            {currentStatusLabel}
            <ChevronDown
              size={14}
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
              }}
            />
          </div>

          {open && (
            <div
              style={{
                position: "absolute",
                top: "44px",
                left: 0,
                width: "160px",
                background: "#4b4b50",
                borderRadius: "16px",
                padding: "6px",
                zIndex: 100,
              }}
            >
              {STATUS_OPTIONS.map((s) => (
                <div
                  key={s.key}
                  onClick={() => {
                    onStatusChange(job.id, s.key);
                    setOpen(false);
                  }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#2563eb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {job.status === s.key && "✓ "} {s.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {job.link && (
          <a href={job.link} target="_blank" rel="noreferrer">
            <ExternalLink
              size={18}
              style={{ color: "#9ca3af" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#525457")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#9ca3af")
              }
            />
          </a>
        )}
      </div>

      {/* ✅ Notes (correct placement) */}
      {job.notes?.trim() && (
        <>
          <div
            style={{
              height: "1px",
              background: "#e5e7eb",
              margin: "16px 0",
            }}
          />
          <em
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: 1.6,
            }}
          >
            {job.notes}
          </em>
        </>
      )}
    </div>
  );
};

export default JobCard;
