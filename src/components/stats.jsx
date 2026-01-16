const Stat = ({ label, value, highlight }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "56px",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: 1,
          color: highlight || "#111827",
        }}
      >
        {value}
      </span>

      <span
        style={{
          fontSize: "13px",
          marginTop: "4px",
          color: "#6b7280",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default Stat;
