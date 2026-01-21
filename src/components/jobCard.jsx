import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { formatAppliedDate } from "../utilities/date";
import useIsMobile from "../hooks/useIsMobile";
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

  // Mobile breakpoint
  const isMobile = useIsMobile(850);

  const dropdownRef = useRef(null);

  const currentStatusLabel =
    STATUS_OPTIONS.find((s) => s.key === job.status)?.label || job.status;

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (isMobile) return;

    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMobile]);

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${job.role}" at "${job.company}"?`
      )
    ) {
      onDelete(job.id);
    }
  };

  const showActions = isMobile || hover;

  return (
    <>
      <div
        onMouseEnter={() => !isMobile && setHover(true)}
        onMouseLeave={() => !isMobile && setHover(false)}
        style={{
          ...styles.cardContainer,
          ...(hover && !isMobile ? styles.cardHoverState : {}),
        }}
      >
        <div style={styles.cardHeader}>
          <div>
            <h3 style={styles.jobTitle}>{job.role}</h3>
            <p style={styles.companyName}>{job.company}</p>
          </div>

          {showActions && (
            <div style={styles.actionIcons}>
              <SquarePen
                size={18}
                style={styles.iconBase}
                onClick={() => onEdit(job)}
              />
              <Trash2
                size={18}
                style={styles.iconBase}
                onClick={handleDelete}
              />
            </div>
          )}
        </div>

        <div style={styles.jobDetails}>
          <div style={styles.jobDetailRow}>
            <MapPin size={14} /> {job.location}
          </div>
          <div style={styles.jobDetailRow}>
            <Calendar size={14} /> Applied on{" "}
            {formatAppliedDate(job.appliedDate)}
          </div>
        </div>

        <div style={styles.cardFooter}>
          <div ref={dropdownRef} style={styles.statusWrapper}>
            <div
              onClick={() => setOpen(true)}
              style={{
                ...styles.statusPill,
                background: column.bg,
                color: column.color,
              }}
            >
              {currentStatusLabel}
              <ChevronDown size={14} />
            </div>

            {/* DESKTOP dropdown */}
            {open && !isMobile && (
              <div style={styles.statusDropdown}>
                {STATUS_OPTIONS.map((s) => (
                  <div
                    key={s.key}
                    style={styles.statusOption}
                    onClick={() => {
                      onStatusChange(job.id, s.key);
                      setOpen(false);
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
              <ExternalLink size={18} style={styles.iconBase} />
            </a>
          )}
        </div>

        {job.notes?.trim() && (
          <>
            <div style={styles.notesDivider} />
            <em style={styles.notesText}>{job.notes}</em>
          </>
        )}
      </div>

      {/* MOBILE bottom sheet (PORTAL) */}
      {open &&
        isMobile &&
        createPortal(
          <div style={styles.sheetOverlay} onClick={() => setOpen(false)}>
            <div
              style={styles.sheet}
              onClick={(e) => e.stopPropagation()}
            >
              {STATUS_OPTIONS.map((s) => (
                <div
                  key={s.key}
                  style={styles.sheetOption}
                  onClick={() => {
                    onStatusChange(job.id, s.key);
                    setOpen(false);
                  }}
                >
                  {s.label}
                  {job.status === s.key && " ✓"}
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default JobCard;

/* ================== STYLES ================== */

const styles = {
  cardContainer: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
    position: "relative",
  },

  cardHoverState: {
    border: "1px solid #52b7ff",
    transform: "translateY(-4px)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
  },

  jobTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 500,
  },

  companyName: {
    marginTop: "6px",
    fontSize: "16px",
    color: "#374151",
  },

  actionIcons: {
    display: "flex",
    gap: "12px",
  },

  iconBase: {
    color: "#9ca3af",
    cursor: "pointer",
  },

  jobDetails: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#6b7280",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  jobDetailRow: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },

  cardFooter: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusWrapper: {
    position: "relative",
  },

  statusPill: {
    padding: "8px 16px",
    borderRadius: "12px",
    fontWeight: 550,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  statusDropdown: {
    position: "absolute",
    top: "44px",
    left: 0,
    width: "160px",
    background: "#4b4b50",
    borderRadius: "16px",
    padding: "6px",
    zIndex: 100,
  },

  statusOption: {
    padding: "8px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#ffffff",
  },

  notesDivider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "16px 0",
  },

  notesText: {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: 1.6,
  },

  /* ===== MOBILE SHEET ===== */

  sheetOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 3000,
    display: "flex",
    alignItems: "flex-end",
  },

  sheet: {
    width: "100%",
    background: "#ffffff",
    borderRadius: "20px 20px 0 0",
    padding: "16px",
    boxShadow: "0 -10px 30px rgba(0,0,0,0.25)",
  },

  sheetOption: {
    padding: "16px",
    fontSize: "16px",
    borderBottom: "1px solid #e5e7eb",
    cursor: "pointer",
  },
};
