import { useEffect } from "react";
import useIsMobile from "../hooks/useIsMobile";

const Modal = ({ isOpen, onClose, children }) => {
  // Used to control mobile layout (< 850px)
  const isMobile = useIsMobile(850);

  useEffect(() => {
    if (!isOpen) return;

    // Lock background scroll while modal is open
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        ...styles.overlay,
        alignItems: isMobile ? "flex-end" : "center",
        padding: isMobile ? 0 : "16px", // 🔑 no padding on mobile
      }}
      onClick={onClose}
    >
      <div
        style={{
          ...styles.modal,
          maxWidth: isMobile ? "100%" : "520px",
          maxHeight: isMobile ? "90vh" : "none",
          borderRadius: isMobile ? "20px 20px 0 0" : "20px",
          overflowY: isMobile ? "auto" : "hidden", // 🔑 SINGLE scroll container
          animation: isMobile ? "slideUp 0.25s ease" : "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>

      {isMobile && (
        <style>
          {`
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}
        </style>
      )}
    </div>
  );
};

export default Modal;

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    zIndex: 1000,
  },

  modal: {
    width: "100%",
    background: "#ffffff",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
  },
};
