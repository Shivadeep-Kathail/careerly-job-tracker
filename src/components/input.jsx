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
  // Used to control mobile input sizing (< 850px)
  const isMobile = useIsMobile(850);

  return (
    <div style={{ marginBottom: "22px" }}>
      {label && (
        <label style={labelStyle}>
          {label}
          {/* Indicates required fields without handling validation */}
          {required && (
            <span style={{ color: "#ef4444", fontSize: "12px" }}>*</span>
          )}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={{
            ...inputStyle,
            height: "120px",
            resize: "none",
            fontSize: isMobile ? "16px" : "14px",
          }}
          maxLength={50}
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

const labelStyle = {
  fontSize: "16px",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "8px",
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d9d8d8",
  outline: "none",
};
