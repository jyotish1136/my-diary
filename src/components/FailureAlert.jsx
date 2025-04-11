import React, { useState } from "react";

const FailureAlert = ({ message }) => {
  const [visible, setVisible] = useState(true);

  setTimeout(() => setVisible(false), 5000);
  if (!visible) return null;

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div
        className="alert alert-danger alert-dismissible fade show d-flex align-items-center shadow rounded p-3"
        role="alert"
      >
        <i
          className="bi bi-exclamation-triangle-fill me-2"
          style={{ fontSize: "1.2rem" }}
        ></i>
        <span>{message || "Something went wrong. Please try again!"}</span>
        <button
          type="button"
          className="btn-close ms-auto"
          onClick={() => setVisible(false)}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default FailureAlert;
