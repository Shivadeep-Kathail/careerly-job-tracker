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
import "./jobCard.css";

const STATUS_OPTIONS = [
  { key: "wishlist", label: "Wishlist" },
  { key: "applied", label: "Applied" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "rejected", label: "Rejected" },
];

const JobCard = ({ job, column, onEdit, onDelete, onStatusChange }) => {
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

  return (
    <>
      <div className="job-card">
        {/* Header */}
        <div className="job-card-header">
          <div>
            <h3 className="job-card-role">{job.role}</h3>
            <p className="job-card-company">{job.company}</p>
          </div>

          <div className={`job-card-actions${isMobile ? " job-card-actions--visible" : ""}`}>
            <SquarePen
              size={15}
              className="job-card-action"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(job);
              }}
            />

            <Trash2
              size={15}
              className="job-card-action job-card-action--delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="job-card-details">
          <div className="job-card-detail">
            <MapPin size={12} /> {job.location}
          </div>
          <div className="job-card-detail">
            <Calendar size={12} /> {formatAppliedDate(job.appliedDate)}
          </div>
        </div>

        {/* Footer */}
        <div className="job-card-footer">
          <div ref={dropdownRef} className="job-card-status-wrapper">
            <div
              className="job-card-status"
              style={{ background: column.bg, color: column.color }}
              onClick={() =>
                isMobile
                  ? setMobileOpen(true)
                  : setDesktopOpen((v) => !v)
              }
            >
              {currentStatusLabel}
              <ChevronDown size={12} />
            </div>

            {desktopOpen && !isMobile && (
              <div className="job-card-dropdown">
                {STATUS_OPTIONS.map((s) => (
                  <div
                    key={s.key}
                    className="job-card-dropdown-item"
                    onClick={() => {
                      onStatusChange(job.id, s.key);
                      setDesktopOpen(false);
                    }}
                  >
                    {job.status === s.key && "✓ "}{s.label}
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
              className="job-card-link"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Notes */}
        {hasNotes && (
          <div className="job-card-notes">{job.notes}</div>
        )}
      </div>

      {/* Mobile bottom sheet */}
      {mobileOpen &&
        isMobile &&
        createPortal(
          <div
            className="job-card-sheet-overlay"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="job-card-sheet"
              onClick={(e) => e.stopPropagation()}
            >
              {STATUS_OPTIONS.map((s) => (
                <div
                  key={s.key}
                  className="job-card-sheet-option"
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