import "./input.css";

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
  const fieldClass = `input-field${as === "textarea" ? " input-field--textarea" : ""}`;

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required"> *</span>}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={50}
          className={fieldClass}
        />
      ) : as === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field"
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
          className="input-field"
        />
      )}
    </div>
  );
};

export default Input;
