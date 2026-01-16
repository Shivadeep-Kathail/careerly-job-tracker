const Stat = ({ label, value, highlight }) => {
  return (
    <div style={styles.container}>
      <span
        style={{
          ...styles.value,
          color: highlight || styles.value.color,
        }}
      >
        {value}
      </span>

      <span style={styles.label}>{label}</span>
    </div>
  );
};

export default Stat;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "56px",
  },

  value: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1,
    color: "#111827",
  },

  label: {
    fontSize: "13px",
    marginTop: "4px",
    color: "#6b7280",
  },
};
