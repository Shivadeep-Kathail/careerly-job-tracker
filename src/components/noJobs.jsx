const NoJobs = ({ onAddJob }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: "40px 20px",
      }}
    >
      <div
        onClick={onAddJob}
        style={{
          border: "1.5px dashed var(--border-hover)",
          borderRadius: "var(--radius)",
          padding: "32px 48px",
          textAlign: "center",
          cursor: "pointer",
          transition: "border-color 0.15s ease",
          maxWidth: "400px",
          width: "100%",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--text-muted)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
      >
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "14px",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          No applications yet —{" "}
          <span style={{ color: "var(--text-secondary)" }}>
            press{" "}
            <kbd
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "20px",
                minWidth: "20px",
                padding: "0 5px",
                fontSize: "11px",
                fontWeight: 600,
                fontFamily: "inherit",
                color: "var(--text-secondary)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                verticalAlign: "middle",
              }}
            >
              N
            </kbd>{" "}
            to add one
          </span>
        </p>
      </div>
    </div>
  );
};

export default NoJobs;
