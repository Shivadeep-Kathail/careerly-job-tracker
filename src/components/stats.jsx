const Stat = ({ label, value }) => (
  <div style={{ textAlign: "center", minWidth: "40px" }}>
    <h2>{value}</h2>
    <p>{label}</p>
  </div>
);

export default Stat;
