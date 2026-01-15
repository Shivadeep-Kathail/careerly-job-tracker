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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (jobToEdit) {
      updateJob({
        ...jobToEdit,
        role,
        company,
        location,
        link,
        appliedDate: date,
        status,
        notes,
      });
    } else {
      addJob({
        id: crypto.randomUUID(),
        role,
        company,
        location,
        link,
        appliedDate: date,
        status,
        notes,
      });
    }

    onClose();
  };

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


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>{jobToEdit ? "Edit Job Application" : "Add Job Application"}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>
              Job Title <small>*</small>
            </label>
          </div>
          <div>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Software Engineer"
              required
            />
          </div>
        </div>

        <div>
          <div>
            <label>
              Company Name <small>*</small>
            </label>
          </div>
          <div>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google"
              required
            />
          </div>
        </div>

        <div>
          <div>
            <label>
              Location <small>*</small>
            </label>
          </div>
          <div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco, CA"
              required
            />
          </div>
        </div>

        <div>
          <div>
            <label>Application Link</label>
          </div>
          <div>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        {/* DATE + STATUS (SIDE BY SIDE LATER WITH CSS) */}
        <div>
          <label>Application Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="wishlist">Wishlist</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <div>
            <label>Notes</label>
          </div>
          <div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes or reminders..."
            />
          </div>
        </div>

        <div>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={!isFormValid}> {jobToEdit ? "Save Changes" : "Add Job"} </button>

        </div>
      </form>
    </Modal>
  );
};

export default JobModal;
