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

  const isFormValid = role.trim() && company.trim() && location.trim();

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          {jobToEdit ? "Edit Job Application" : "Add Job Application"}
        </h2>

        <button onClick={onClose} style={closeBtn}>✕</button>
      </div>

      {/* 🔑 NO maxHeight / overflow here */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <Input label="Job Title" required value={role} onChange={setRole} />
        <Input label="Company Name" required value={company} onChange={setCompany} />
        <Input label="Location" required value={location} onChange={setLocation} />
        <Input label="Application Link" type="url" value={link} onChange={setLink} />

        <Input label="Application Date" type="date" value={date} onChange={setDate} />

        <Input label="Status" as="select" value={status} onChange={setStatus}>
          <option value="wishlist">Saved</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </Input>

        <Input
          label="Notes"
          as="textarea"
          value={notes}
          onChange={setNotes}
          placeholder="Add any additional notes or reminders..."
        />

        <div style={footerStyle}>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isFormValid} style={{ flex: 1 }}>
            {jobToEdit ? "Save Changes" : "Add Job"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default JobModal;

/* ===== styles ===== */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 20px",
  background: "linear-gradient(90deg, #f7faff, #fff5ff)",
  borderBottom: "1px solid #e5e7eb",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: 550,
  margin: 0,
};

const closeBtn = {
  border: "none",
  background: "transparent",
  fontSize: "22px",
  cursor: "pointer",
  color: "#6b7280",
  padding: "8px",
};

const formStyle = {
  padding: "24px",
};

const footerStyle = {
  display: "flex",
  gap: "12px",
  paddingTop: "20px",
  borderTop: "1px solid #e5e7eb",
};
