import JobCard from "./jobCard";

const Coloumn = ({ title }) => {
  return (
    <>
      <div
        style={{
          width: "20%",
          background: "#f9f9f9",
          padding: "12px",
          borderRadius: "10px",
        }}
      >
        <h3>{title}</h3>
        <JobCard />
        <JobCard />
      </div>
    </>
  );
};

export default Coloumn;
