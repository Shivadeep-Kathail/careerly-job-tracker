import { Briefcase } from "lucide-react";
import Button from "./button";
import useIsMobile from "../hooks/useIsMobile";

const NoJobs = ({ onAddJob }) => {
  // Used to control mobile layout (< 850px)
  const isMobile = useIsMobile(850);

  return (
    <div
      style={{
        ...styles.container,
        minHeight: isMobile ? "60vh" : "70vh",
        padding: isMobile ? "0 16px" : "0",
      }}
    >
      <div
        style={{
          ...styles.iconWrap,
          width: isMobile ? "64px" : "72px",
          height: isMobile ? "64px" : "72px",
        }}
      >
        <Briefcase size={isMobile ? 28 : 32} strokeWidth={2.2} />
      </div>

      <h3
        style={{
          ...styles.title,
          fontSize: isMobile ? "18px" : "20px",
        }}
      >
        No applications yet
      </h3>

      <p
        style={{
          ...styles.description,
          fontSize: isMobile ? "15px" : "17px",
          lineHeight: isMobile ? 1.4 : 1.2,
        }}
      >
        Start tracking your job applications by adding your first one.
        Keep all your opportunities organized in one place.
      </p>

      <Button size={isMobile ? "lg" : "md"} onClick={onAddJob}>
        Add Your First Job
      </Button>
    </div>
  );
};

export default NoJobs;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "16px",
  },

  iconWrap: {
    borderRadius: "15px",
    background: "linear-gradient(135deg, #4c4ff0, #9d42f1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  title: {
    margin: 0,
    fontWeight: 500,
  },

  description: {
    maxWidth: "420px",
    color: "#6b7280",
  },
};
