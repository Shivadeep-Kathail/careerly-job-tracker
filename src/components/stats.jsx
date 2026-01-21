import useIsMobile from "../hooks/useIsMobile";

const Stat = ({ label, value, highlight }) => {
  // Used to control mobile sizing (< 850px)
  const isMobile = useIsMobile(850);

  return (
    <div
      style={{
        ...styles.container,
        minWidth: isMobile ? "48px" : "56px",
      }}
    >
      <span
        style={{
          ...styles.value,
          color: highlight || styles.value.color,
          fontSize: isMobile ? "16px" : "18px",
        }}
      >
        {value}
      </span>

      <span
        style={{
          ...styles.label,
          fontSize: isMobile ? "12px" : "13px",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default Stat;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    whiteSpace: "nowrap",
  },

  value: {
    fontWeight: 600,
    lineHeight: 1,
    color: "#111827",
  },

  label: {
    marginTop: "4px",
    color: "#6b7280",
  },
};
