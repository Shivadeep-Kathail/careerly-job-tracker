import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Modal from "./modal";
import Button from "./button";
import Input from "./input";
import "./jobModal.css";

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

  const isMobile = window.innerWidth < 640;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="job-modal-header">
        <h2 className="job-modal-title">
          {jobToEdit ? "Edit Application" : "New Application"}
        </h2>
        <button onClick={onClose} className="job-modal-close">
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="job-modal-body">
        <form onSubmit={handleSubmit} className="job-modal-form">
          <Input
            label="Job Title"
            required
            value={role}
            onChange={setRole}
            placeholder="e.g., Software Engineer Intern"
          />

          <Input
            label="Company"
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
            label="Link"
            type="url"
            value={link}
            onChange={setLink}
            placeholder="https://..."
          />

          {/* Date + Status */}
          <div
            className="job-modal-row"
            style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
          >
            <Input
              label="Date"
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
            placeholder="Any additional notes..."
          />

          {/* Footer */}
          <div className="job-modal-footer">
            <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </Button>

            <Button type="submit" disabled={!isFormValid} style={{ flex: 1 }}>
              {jobToEdit ? "Save" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default JobModal;
