import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { formatAppliedDate } from "../utilities/date";
import { loadResumeText } from "../utilities/storage";
import { checkMatch } from "../utilities/geminiApi";
import useIsMobile from "../hooks/useIsMobile";
import MatchModal from "./matchModal";
import {
  Trash2,
  SquarePen,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
  ScanSearch,
} from "lucide-react";
import "./jobCard.css";

const STATUS_OPTIONS = [
  { key: "wishlist", label: "Wishlist" },
  { key: "applied", label: "Applied" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "rejected", label: "Rejected" },
];

const getMatchBadgeClass = (score) => {
  if (score >= 75) return "job-card-match-badge--green";
  if (score >= 50) return "job-card-match-badge--amber";
  return "job-card-match-badge--red";
};

const JobCard = ({ job, column, onEdit, onDelete, onStatusChange, onUpdateJob }) => {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [matchLoading, setMatchLoading] = useState(false);

  const isMobile = useIsMobile(850);
  const dropdownRef = useRef(null);

  const hasNotes = Boolean(job.notes?.trim());
  const hasDescription = Boolean(job.description?.trim());
  const hasResume = Boolean(loadResumeText());
  const hasCachedMatch = typeof job.matchScore === "number";

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

  const runMatchCheck = async () => {
    const resumeText = loadResumeText();
    if (!resumeText || !hasDescription) return;

    setMatchLoading(true);
    setMatchModalOpen(true);

    try {
      const result = await checkMatch(resumeText, job.description);
      // Cache result on job object
      onUpdateJob({
        ...job,
        matchScore: result.matchScore,
        strengths: result.strengths,
        gaps: result.gaps,
      });
    } catch (err) {
      console.error("Match check failed:", err);
      alert(err.message || "Failed to check match. Please try again.");
      setMatchModalOpen(false);
    } finally {
      setMatchLoading(false);
    }
  };

  const handleCheckMatch = (e) => {
    e.stopPropagation();

    if (hasCachedMatch) {
      // Show cached results
      setMatchModalOpen(true);
      return;
    }

    runMatchCheck();
  };

  const handleRecheck = () => {
    runMatchCheck();
  };

  // Determine tooltip for disabled state
  const matchTooltip = !hasResume
    ? "Upload your resume first"
    : !hasDescription
    ? "Add a job description first"
    : hasCachedMatch
    ? `Match: ${job.matchScore}% — click to view`
    : "Check resume match";

  const matchData = hasCachedMatch
    ? { matchScore: job.matchScore, strengths: job.strengths, gaps: job.gaps }
    : null;

  return (
    <>
      <div className="job-card">
        {/* Match score badge */}
        {hasCachedMatch && (
          <div
            className={`job-card-match-badge ${getMatchBadgeClass(job.matchScore)}`}
            title={`Match: ${job.matchScore}%`}
          >
            {job.matchScore}%
          </div>
        )}

        {/* Header */}
        <div className="job-card-header">
          <div>
            <h3 className="job-card-role">{job.role}</h3>
            <p className="job-card-company">{job.company}</p>
          </div>

          <div className={`job-card-actions${isMobile ? " job-card-actions--visible" : ""}`}>
            <button
              className="job-card-action"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(job);
              }}
              aria-label="Edit job"
            >
              <SquarePen size={16} />
            </button>

            <button
              className="job-card-action job-card-action--delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              aria-label="Delete job"
            >
              <Trash2 size={16} />
            </button>
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

          <div className="job-card-footer-right">
            {/* Check Match button */}
            <button
              className={`job-card-match-btn${hasCachedMatch ? " job-card-match-btn--done" : ""}`}
              onClick={handleCheckMatch}
              disabled={!hasResume || !hasDescription}
              title={matchTooltip}
              aria-label={matchTooltip}
            >
              <ScanSearch size={13} />
              {hasCachedMatch ? `${job.matchScore}%` : "Match"}
            </button>

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

      {/* Match modal */}
      <MatchModal
        isOpen={matchModalOpen}
        onClose={() => setMatchModalOpen(false)}
        matchData={matchData}
        onRecheck={handleRecheck}
        isLoading={matchLoading}
      />
    </>
  );
};

export default JobCard;