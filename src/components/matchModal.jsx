import { X, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import Modal from "./modal";
import "./matchModal.css";

const ScoreRing = ({ score }) => {
  const radius = 54;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 75 ? "var(--match-green)" :
    score >= 50 ? "var(--match-amber)" :
                  "var(--match-red)";

  return (
    <div className="match-ring-wrapper">
      <svg className="match-ring-svg" viewBox="0 0 128 128">
        {/* Background track */}
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        {/* Animated score arc */}
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="match-ring-arc"
          transform="rotate(-90 64 64)"
        />
      </svg>
      <div className="match-ring-label">
        <span className="match-ring-score" style={{ color }}>{score}</span>
        <span className="match-ring-percent">%</span>
      </div>
    </div>
  );
};

const MatchModal = ({ isOpen, onClose, matchData, onRecheck, isLoading }) => {
  if (!matchData && !isLoading) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="match-modal-header">
        <h2 className="match-modal-title">Resume Match</h2>
        <button onClick={onClose} className="match-modal-close">
          <X size={18} />
        </button>
      </div>

      <div className="match-modal-body">
        {isLoading ? (
          <div className="match-modal-loading">
            <div className="match-loading-ring" />
            <span>Analyzing your resume…</span>
          </div>
        ) : matchData ? (
          <>
            {/* Score ring */}
            <div className="match-score-section">
              <ScoreRing score={matchData.matchScore} />
              <div className="match-score-label">
                {matchData.matchScore >= 75
                  ? "Strong Match"
                  : matchData.matchScore >= 50
                  ? "Moderate Match"
                  : "Weak Match"}
              </div>
            </div>

            {/* Strengths */}
            {matchData.strengths?.length > 0 && (
              <div className="match-list-section">
                <h3 className="match-list-heading match-list-heading--green">
                  <CheckCircle2 size={14} />
                  Strengths
                </h3>
                <ul className="match-list match-list--green">
                  {matchData.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gaps */}
            {matchData.gaps?.length > 0 && (
              <div className="match-list-section">
                <h3 className="match-list-heading match-list-heading--amber">
                  <AlertTriangle size={14} />
                  Gaps
                </h3>
                <ul className="match-list match-list--amber">
                  {matchData.gaps.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Re-check button */}
            <button className="match-recheck-btn" onClick={onRecheck}>
              <RefreshCw size={13} />
              Re-check
            </button>
          </>
        ) : null}
      </div>
    </Modal>
  );
};

export default MatchModal;
