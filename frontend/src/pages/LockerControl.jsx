// src/pages/LockerControl.jsx
import React, { useState } from "react";
import axios from "axios";
import "./LockerControl.css";

// ✅ Use environment variable or fallback to deployed backend
const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://luggo-backend-cpavgbcdhjexexh7.centralindia-01.azurewebsites.net";

function LockerControl() {
  const [status1, setStatus1] = useState("LOCKED");
  const [status2, setStatus2] = useState("LOCKED");
  const [loading, setLoading] = useState(false);

  // ✅ Send command to backend (LOCK1, UNLOCK1, LOCK2, UNLOCK2)
  const sendCommand = async (command) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/locker/send`, { command });
      const message =
        response.data?.result?.message ||
        response.data?.message ||
        `Command ${command} sent successfully!`;

      // Update local status
      if (command === "LOCK1") setStatus1("LOCKED");
      else if (command === "UNLOCK1") setStatus1("UNLOCKED");
      else if (command === "LOCK2") setStatus2("LOCKED");
      else if (command === "UNLOCK2") setStatus2("UNLOCKED");

      alert(message);
    } catch (err) {
      console.error("❌ Error sending command:", err);
      alert(err.response?.data?.message || "Failed to send command!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="locker-container">
      <h2>Luggo Smart Locker Control</h2>

      {/* Locker 1 */}
      <div className="locker-box">
        <h3>Locker 1</h3>
        <p className="status">
          Status: <strong>{status1}</strong>
        </p>
        <div className="button-group">
          <button
            className="lock-btn"
            disabled={loading}
            onClick={() => sendCommand("LOCK1")}
          >
            🔒 Lock
          </button>
          <button
            className="unlock-btn"
            disabled={loading}
            onClick={() => sendCommand("UNLOCK1")}
          >
            🔓 Unlock
          </button>
        </div>
      </div>

      {/* Locker 2 */}
      <div className="locker-box">
        <h3>Locker 2</h3>
        <p className="status">
          Status: <strong>{status2}</strong>
        </p>
        <div className="button-group">
          <button
            className="lock-btn"
            disabled={loading}
            onClick={() => sendCommand("LOCK2")}
          >
            🔒 Lock
          </button>
          <button
            className="unlock-btn"
            disabled={loading}
            onClick={() => sendCommand("UNLOCK2")}
          >
            🔓 Unlock
          </button>
        </div>
      </div>

      {loading && <p className="loading">Processing...</p>}
    </div>
  );
}

export default LockerControl;
