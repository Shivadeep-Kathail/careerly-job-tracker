import { useEffect, useState } from "react";
import Modal from "./modal";

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
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          {jobToEdit ? "Edit Job Application" : "Add Job Application"}
        </h2>
        <button onClick={onClose} style={closeBtn}>✕</button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <Field label="Job Title" required value={role} onChange={setRole} placeholder="e.g., Software Engineer Intern" />
        <Field label="Company Name" required value={company} onChange={setCompany} placeholder="e.g., Google" />
        <Field label="Location" required value={location} onChange={setLocation} placeholder="e.g., San Francisco, CA" />
        <Field label="Application Link" value={link} onChange={setLink} placeholder="https://..." type="url" />

        <div style={rowStyle}>
          <div>
            <label style={labelStyle}>Application Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
              <option value="wishlist">Saved</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={labelStyle}>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional notes or reminders..."
            style={{ ...inputStyle, height: "120px", resize: "none" }}
          />
        </div>

        <div style={footerStyle}>
          <button type="button" onClick={onClose} style={cancelBtn}>Cancel</button>
          <button type="submit" disabled={!isFormValid} style={{ ...primaryBtn, opacity: isFormValid ? 1 : 0.6 }}>
            {jobToEdit ? "Save Changes" : "Add Job"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default JobModal;

/* ---------- Field ---------- */
const Field = ({ label, required, value, onChange, placeholder, type = "text" }) => (
  <div style={{ marginBottom: "22px" }}>
    <label style={labelStyle}>
      {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      style={inputStyle}
    />
  </div>
);

/* ---------- Styles ---------- */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  background: "linear-gradient(90deg, #f7faffff, #fff5ffff)",
  borderBottom: "1px solid #e5e7eb",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: 550,
};

const closeBtn = {
  border: "none",
  background: "transparent",
  fontSize: "20px",
  cursor: "pointer",
  color: "#6b7280",
};

const formStyle = {
  padding: "24px",
  maxWidth: "480px",   // 👈 narrower than modal
  margin: "0 -12px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "8px",
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #d9d8d8ff",
  fontSize: "14px",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "45px",
  marginBottom: "24px",
};

const footerStyle = {
  display: "flex",
  gap: "12px",
  paddingTop: "20px",
  borderTop: "1px solid #e5e7eb",
};

const cancelBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  cursor: "pointer",
};

const primaryBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  color: "#ffffff",
  background: "linear-gradient(90deg, rgba(8, 19, 242, 0.85) 0%, rgba(180, 32, 254, 0.95) 100%)",
};
