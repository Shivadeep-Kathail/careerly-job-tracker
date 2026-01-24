import useIsMobile from "../hooks/useIsMobile";

const Input = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  as = "input",
  children,
}) => {
  const isMobile = useIsMobile(850);

  return (
    <div style={wrapperStyle}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && (
            <span style={{ color: "#ef4444", fontSize: "12px" }}> *</span>
          )}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={50}
          style={{
            ...inputStyle,
            height: "75px",
            resize: "none",
            fontSize: isMobile ? "16px" : "14px",
          }}
        />
      ) : as === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            ...inputStyle,
            fontSize: isMobile ? "16px" : "14px",
          }}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={{
            ...inputStyle,
            fontSize: isMobile ? "16px" : "14px",
          }}
        />
      )}
    </div>
  );
};

export default Input;

/* ================= STYLES ================= */

const wrapperStyle = {
  marginBottom: "22px",
  paddingInline: "0px", 
};

const labelStyle = {
  fontSize: "16px",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "8px",
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #d9d8d8",
  boxSizing: "border-box", 
};
