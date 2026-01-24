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
  const [hoveredAction, setHoveredAction] = useState(null);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useIsMobile(850);
  const dropdownRef = useRef(null);

  const hasNotes = Boolean(job.notes?.trim());

  const currentStatusLabel =
    STATUS_OPTIONS.find((s) => s.key === job.status)?.label || job.status;

  useEffect(() => {
    if (isMobile) return;

    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopOpen(false);
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
          ...styles.card,
          ...(hover && !isMobile ? styles.cardHover : {}),
        }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h3 style={styles.role}>{job.role}</h3>
            <p style={styles.company}>{job.company}</p>
          </div>

          {showActions && (
            <div style={styles.actions}>
              <SquarePen
                size={18}
                style={{
                  ...styles.actionIcon,
                  ...(hoveredAction === "edit" ? styles.editHover : {}),
                }}
                onMouseEnter={() => setHoveredAction("edit")}
                onMouseLeave={() => setHoveredAction(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(job);
                }}
              />

              <Trash2
                size={18}
                style={{
                  ...styles.actionIcon,
                  ...(hoveredAction === "delete" ? styles.deleteHover : {}),
                }}
                onMouseEnter={() => setHoveredAction("delete")}
                onMouseLeave={() => setHoveredAction(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              />
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div style={styles.details}>
          <div>
            <MapPin size={14} /> {job.location}
          </div>
          <div>
            <Calendar size={14} /> {formatAppliedDate(job.appliedDate)}
          </div>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          <div ref={dropdownRef} style={styles.statusWrapper}>
            <div
              style={{
                ...styles.status,
                background: column.bg,
                color: column.color,
              }}
              onClick={() =>
                isMobile
                  ? setMobileOpen(true)
                  : setDesktopOpen((v) => !v)
              }
            >
              {currentStatusLabel}
              <ChevronDown size={14} />
            </div>

            {desktopOpen && !isMobile && (
              <div style={styles.dropdown}>
                {STATUS_OPTIONS.map((s) => (
                  <div
                    key={s.key}
                    style={styles.option}
                    onClick={() => {
                      onStatusChange(job.id, s.key);
                      setDesktopOpen(false);
                    }}
                  >
                    {job.status === s.key && "✓ "} {s.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {job.link && (
            <a
              href={job.link}
              target="_blank"
              rel="noreferrer"
              style={styles.externalLink}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>

        {/* NOTES */}
        {hasNotes && (
          <div style={styles.notesWrapper}>
            <em style={styles.notes}>{job.notes}</em>
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM SHEET */}
      {mobileOpen &&
        isMobile &&
        createPortal(
          <div
            style={styles.sheetOverlay}
            onClick={() => setMobileOpen(false)}
          >
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
                    setMobileOpen(false);
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

/* ================= STYLES ================= */

const styles = {
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    transition: "0.25s",
    position: "relative",
    zIndex: 1,
  },

  cardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
    border: "1px solid rgba(50, 170, 235, 0.7)",
    zIndex: 10,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
  },

  role: { margin: 0, fontSize: "22px" },
  company: { marginTop: "6px", color: "#374151" },

  actions: { display: "flex", gap: "12px", cursor: "pointer" },

  actionIcon: {
    color: "#6b7280",
    transition: "color 0.2s ease",
  },

  editHover: {
    color: "#3b82f6",
  },

  deleteHover: {
    color: "#ef4444",
  },

  details: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#6b7280",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  footer: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  notesWrapper: {
    marginTop: "12px",
    paddingTop: "10px",
  },

  notes: {
    marginTop: "14px",
    paddingTop: "10px",
    borderTop: "1px solid #e5e7eb",
    fontSize: "13px",
    color: "#4b4c4cb4",
    fontStyle: "italic",
    lineHeight: 1.4,
  },

  statusWrapper: {
    position: "relative",
    zIndex: 20,
  },

  status: {
    padding: "8px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },

  externalLink: {
    color: "#3131338c",
    display: "flex",
    alignItems: "center",
  },

  dropdown: {
    position: "absolute",
    top: "44px",
    left: 0,
    minWidth: "160px",
    background: "#4b4b50",
    borderRadius: "12px",
    padding: "6px",
    color: "#fff",
    zIndex: 30,
  },

  option: {
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "8px",
  },

  sheetOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "flex-end",
    zIndex: 3000,
  },

  sheet: {
    width: "100%",
    background: "#fff",
    borderRadius: "20px 20px 0 0",
    padding: "16px",
  },

  sheetOption: {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    cursor: "pointer",
  },
};
 