import { useState } from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  style = {},
}) => {
  // Tracks hover state to control interaction styles
  const [hover, setHover] = useState(false);

  // Styles that change based on variant and hover state
  const variantStyles = {
    primary: {
      background:
        hover && !disabled
          ? "linear-gradient(90deg, rgba(8,19,242,1), rgba(180,32,254,1))"
          : "linear-gradient(90deg, rgba(8,19,242,0.85), rgba(180,32,254,0.95))",
      color: "#ffffff",
      boxShadow:
        hover && !disabled
          ? "0 10px 22px rgba(0,0,0,0.18)"
          : "0 8px 18px rgba(0,0,0,0.14)",
      transform: hover && !disabled ? "scale(1.03)" : "scale(1)",
    },

    secondary: {
      background: hover && !disabled ? "#f9fafb" : "#ffffff",
      color: "#111827",
      border: "1px solid #e5e7eb",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHover(true)}
      onMouseLeave={() => !disabled && setHover(false)}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;

const baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontWeight: 500,
  border: "none",
  transition: "all 0.15s ease",
};

const sizeStyles = {
  sm: {
    height: "32px",
    padding: "0 12px",
    fontSize: "14px",
    borderRadius: "8px",
  },
  md: {
    height: "40px",
    padding: "0 18px",
    fontSize: "16px",
    borderRadius: "12px",
  },
  lg: {
    height: "48px",
    padding: "0 22px",
    fontSize: "18px",
    borderRadius: "14px",
  },
};
