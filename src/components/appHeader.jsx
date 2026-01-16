import { useState } from "react";
import Stat from "./stats";
import { Bookmark } from "lucide-react";

const AppHeader = ({ onAddJob, stats, jobs = [] }) => {
  const hasJobs = jobs.length > 0;
  const [isHover, setIsHover] = useState(false);

  return (
    <header
      style={{
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        background:
          "linear-gradient(-45deg, rgba(247, 244, 255, 0.94) 50%, rgba(255, 245, 245, 0.89) 50%)",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
        boxShadow: "0 6px 12px -4px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #5148f5, #ea33cc)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
          }}
        >
          <Bookmark
            size={20}
            stroke="#ffffff"
            fill="#ffffff"
            strokeWidth={2.5}
          />

          {/* green dot */}
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "9px",
              height: "9px",
              backgroundColor: "#22c55e",
              borderRadius: "50%",
              border: "2px solid #ffffff",
            }}
          />
        </div>

        <div>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.15,
              background:
                "linear-gradient(90deg, rgba(8,19,242,0.9), rgba(180,32,254,1), rgba(205,36,140,0.9))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Careerly
          </p>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
            Track your job applications effortlessly
          </p>
        </div>
      </div>

      {/* CENTER (stats only if jobs exist) */}
      {hasJobs && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "44px",
            background:
              "linear-gradient(135deg, rgba(232, 234, 255, 0.94) 0%, rgba(254, 236, 255, 0.89) 100%)",
            borderRadius: "14px",
            padding: "0 18px",
            boxShadow: "inset 0 0 0 1px #ececf3",
          }}
        >
          <Stat label="Total" value={stats.total} />
          <Divider />
          <Stat
            label="Interviews"
            value={stats.interview}
            highlight="#8b5cf6"
          />
          <Divider />
          <Stat label="Offers" value={stats.offer} highlight="#22c55e" />
        </div>
      )}

      {/* RIGHT */}
      <button
        onClick={onAddJob}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          background: isHover
            ? "linear-gradient(90deg, rgba(8,19,242,1), rgba(180,32,254,1), rgba(205,36,140,1))"
            : "linear-gradient(90deg, rgba(8,19,242,0.85), rgba(180,32,254,0.95), rgba(205,36,140,0.9))",
          color: "#ffffff",
          height: "40px",
          padding: "0 22px",
          border: "none",
          borderRadius: "14px",
          fontSize: "18px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          boxShadow: isHover
            ? "0 10px 24px rgba(0,0,0,0.18)"
            : "0 8px 20px rgba(0,0,0,0.14)",
          transform: isHover ? "scale(1.03)" : "scale(1)",
          transition: "all 0.15s ease",
        }}
      >
        <span style={{ fontSize: "18px", lineHeight: 1 }}>+</span>
        Add Job
      </button>
    </header>
  );
};

const Divider = () => (
  <span
    style={{
      width: "1px",
      height: "26px",
      background: "#e2c3e3ff",
      margin: "0 14px",
    }}
  />
);

export default AppHeader;
