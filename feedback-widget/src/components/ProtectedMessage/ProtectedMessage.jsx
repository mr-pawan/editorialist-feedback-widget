import React from "react";
import "./ProtectedMessage.css";


const ProtectedMessage = ({ setShowLogin }) => {
  return (
    <div className="protected-container">
      <div className="protected-card">
        <h2>🔒 Restricted Access</h2>
        <p>You must be logged in to access the Admin Dashboard.</p>
        <button className="login-btn" onClick={() => setShowLogin(true)}>
          Login Now
        </button>
      </div>
    </div>
  );
};

export default ProtectedMessage;
