import { useState, useRef, useEffect } from "react";
import { Upload, FileText, RefreshCw, AlertTriangle, Loader2 } from "lucide-react";
import { extractTextFromPdf } from "../utilities/pdfParser";
import {
  saveResumeText,
  saveResumeMeta,
  loadResumeMeta,
  clearResume,
} from "../utilities/storage";
import "./resumeUpload.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ResumeUpload = () => {
  const [meta, setMeta] = useState(() => loadResumeMeta());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Keep meta in sync if another tab changes localStorage
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "careerly_resume_meta") {
        setMeta(loadResumeMeta());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset
    setError("");

    // Validate type
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    // Warn on large files
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const proceed = window.confirm(
        `This PDF is ${sizeMB} MB. Large files may take longer to process and could exceed localStorage limits. Continue?`
      );
      if (!proceed) {
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
    }

    setLoading(true);

    try {
      const { text } = await extractTextFromPdf(file);
      saveResumeText(text);
      const newMeta = {
        filename: file.name,
        uploadedAt: new Date().toISOString(),
      };
      saveResumeMeta(newMeta);
      setMeta(newMeta);
    } catch (err) {
      setError(err.message || "Failed to process PDF.");
    } finally {
      setLoading(false);
      // Reset file input so re-uploading same file triggers onChange
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    clearResume();
    setMeta(null);
    setError("");
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="resume-upload">
      <div className="resume-upload-label">My Resume</div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleUpload}
        style={{ display: "none" }}
        id="resume-file-input"
      />

      {loading ? (
        /* Loading state */
        <div className="resume-upload-loading">
          <Loader2 size={16} className="resume-spinner" />
          <span>Extracting text…</span>
        </div>
      ) : meta ? (
        /* Uploaded state */
        <div className="resume-upload-info">
          <div className="resume-upload-file">
            <FileText size={14} />
            <div className="resume-upload-details">
              <span className="resume-upload-filename">{meta.filename}</span>
              <span className="resume-upload-date">
                {formatDate(meta.uploadedAt)}
              </span>
            </div>
          </div>
          <div className="resume-upload-actions">
            <button
              className="resume-upload-btn resume-upload-btn--replace"
              onClick={() => fileInputRef.current?.click()}
              title="Replace resume"
            >
              <RefreshCw size={12} />
              Replace
            </button>
          </div>
        </div>
      ) : (
        /* Empty state */
        <button
          className="resume-upload-dropzone"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={16} />
          <span>Upload PDF</span>
        </button>
      )}

      {/* Error */}
      {error && (
        <div className="resume-upload-error">
          <AlertTriangle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
