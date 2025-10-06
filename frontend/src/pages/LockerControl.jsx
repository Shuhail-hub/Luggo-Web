// src/pages/LockerControl.jsx
import React, { useState } from "react";
import axios from "axios";
import "./LockerControl.css";

// ✅ Use environment variable or fallback to your deployed backend
const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://luggo-backend-cpavgbcdhjexexh7.centralindia-01.azurewebsites.net";

function LockerControl() {
  const [status, setStatus] = useState("LOCKED");
  const [loading, setLoading] = useState(false);

  // ✅ Send LOCK or UNLOCK command to backend
  const sendCommand = async (command) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/locker/${command.toLowerCase()}`);
      const message =
        response.data?.result?.message ||
        response.data?.message ||
        `Locker ${command}ED successfully!`;

      setStatus(command === "LOCK" ? "LOCKED" : "UNLOCKED");
      alert(message);
    } catch (err) {
      console.error("❌ Error sending command:", err);
      alert(err.response?.data?.message || "Failed to send command to locker!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="locker-container">
      <h2>Luggo Smart Locker Control</h2>
      <p className="status">
        Status: <strong>{status}</strong>
      </p>

      <div className="button-group">
        <button
          className="lock-btn"
          disabled={loading}
          onClick={() => sendCommand("LOCK")}
        >
          🔒 Lock
        </button>

        <button
          className="unlock-btn"
          disabled={loading}
          onClick={() => sendCommand("UNLOCK")}
        >
          🔓 Unlock
        </button>
      </div>

      {loading && <p className="loading">Processing...</p>}
    </div>
  );
}

export default LockerControl;
