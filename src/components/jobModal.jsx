import { useEffect, useState } from "react";
import Modal from "./modal";
import Button from "./button";
import Input from "./input";

const JobModal = ({ isOpen, onClose, addJob, updateJob, jobToEdit }) => {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("wishlist");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (jobToEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRole(jobToEdit.role);
      setCompany(jobToEdit.company);
      setLocation(jobToEdit.location);
      setLink(jobToEdit.link || "");
      setDate(jobToEdit.appliedDate);
      setStatus(jobToEdit.status);
      setNotes(jobToEdit.notes || "");
    } else {
      setRole("");
      setCompany("");
      setLocation("");
      setLink("");
      setDate(new Date().toISOString().split("T")[0]);
      setStatus("wishlist");
      setNotes("");
    }
  }, [jobToEdit, isOpen]);

  const isFormValid =
    role.trim() && company.trim() && location.trim();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      role,
      company,
      location,
      link,
      appliedDate: date,
      status,
      notes,
    };

    jobToEdit
      ? updateJob({ ...jobToEdit, ...payload })
      : addJob({ id: crypto.randomUUID(), ...payload });

    onClose();
  };

  const isMobile = window.innerWidth < 640;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          {jobToEdit ? "Edit Job Application" : "Add Job Application"}
        </h2>
        <button onClick={onClose} style={closeBtn}>✕</button>
      </div>

      {/* BODY (scroll + padding live here) */}
      <div style={bodyStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <Input
            label="Job Title"
            required
            value={role}
            onChange={setRole}
            placeholder="e.g., Software Engineer Intern"
          />

          <Input
            label="Company Name"
            required
            value={company}
            onChange={setCompany}
            placeholder="e.g., Google"
          />

          <Input
            label="Location"
            required
            value={location}
            onChange={setLocation}
            placeholder="e.g., San Francisco, CA"
          />

          <Input
            label="Application Link"
            type="url"
            value={link}
            onChange={setLink}
            placeholder="https://..."
          />

          {/* Date + Status */}
          <div
            style={{
              ...rowStyle,
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            }}
          >
            <Input
              label="Application Date"
              type="date"
              value={date}
              onChange={setDate}
            />

            <Input
              label="Status"
              as="select"
              value={status}
              onChange={setStatus}
            >
              <option value="wishlist">Wishlist</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </Input>
          </div>

          <Input
            label="Notes"
            as="textarea"
            value={notes}
            onChange={setNotes}
            placeholder="Add any additional notes or reminders..."
          />

          {/* Footer */}
          <div style={footerStyle}>
            <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </Button>

            <Button type="submit" disabled={!isFormValid} style={{ flex: 1 }}>
              {jobToEdit ? "Save Changes" : "Add Job"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default JobModal;

/* ================= STYLES ================= */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 24px",
  background: "linear-gradient(90deg, #f7faff 0%, #fff5ff 100%)",
  borderBottom: "1px solid #e5e7eb",
};

const titleStyle = {
  fontSize: "22px",
  fontWeight: 600,
  margin: 0,
};

const closeBtn = {
  border: "none",
  background: "transparent",
  fontSize: "22px",
  cursor: "pointer",
  color: "#6b7280",
};

/* 🔥 THIS FIXES BOTH ISSUES */
const bodyStyle = {
  padding: "20px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxSizing: "border-box",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const rowStyle = {
  display: "grid",
  gap: "16px",
  marginBottom: "8px",
};

const footerStyle = {
  display: "flex",
  gap: "12px",
  paddingTop: "20px",
  borderTop: "1px solid #e5e7eb",
};
