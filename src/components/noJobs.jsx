import { useState } from "react";
import { Briefcase } from "lucide-react";

const NoJobs = ({ onAddJob }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "16px",
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "15px",
          background:
            "linear-gradient(135deg, #4c4ff0ff, #9d42f1ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <Briefcase size={32} strokeWidth={2.2} />
      </div>
      <h3 style={{ margin: 0, fontSize: "20px" }}>
        No applications yet
      </h3>
      <p
        style={{
          maxWidth: "420px",
          fontSize: "17px",
          color: "#6b7280",
          lineHeight: 1.2,
        }}
      >
        Start tracking your job applications by adding your first one.
        Keep all your opportunities organized in one place.
      </p>

      <button
  onClick={onAddJob}
  onMouseEnter={() => setIsHover(true)}
  onMouseLeave={() => setIsHover(false)}
  style={{
    background: isHover
      ? "linear-gradient(90deg, rgba(8, 19, 242, 1) 0%, rgba(180, 32, 254, 1) 100%)"
      : "linear-gradient(90deg, rgba(8, 19, 242, 0.85) 0%, rgba(180, 32, 254, 0.95) 100%)",
    color: "#fff",
    padding: "10px 18px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: isHover
      ? "0 10px 22px rgba(0,0,0,0.18)"
      : "0 8px 18px rgba(0,0,0,0.14)",
    transform: isHover ? "scale(1.03)" : "scale(1)",
    transition: "all 0.15s ease",
  }}
>
  Add Your First Job
</button>

    </div>
  );
};

export default NoJobs;
