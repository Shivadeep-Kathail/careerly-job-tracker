import { Briefcase } from "lucide-react";
import Button from "./button";

const NoJobs = ({ onAddJob }) => {
  return (
    <div style={styles.container}>
      <div style={styles.iconWrap}>
        <Briefcase size={32} strokeWidth={2.2} />
      </div>

      <h3 style={styles.title}>No applications yet</h3>

      <p style={styles.description}>
        Start tracking your job applications by adding your first one.
        Keep all your opportunities organized in one place.
      </p>

      <Button onClick={onAddJob}>
        Add Your First Job
      </Button>
    </div>
  );
};

export default NoJobs;

const styles = {
  container: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "16px",
  },

  iconWrap: {
    width: "72px",
    height: "72px",
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
    fontSize: "20px",
    fontWeight: 500,
  },

  description: {
    maxWidth: "420px",
    fontSize: "17px",
    color: "#6b7280",
    lineHeight: 1.2,
  },
};
