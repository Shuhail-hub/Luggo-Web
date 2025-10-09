// src/pages/LockerControl.jsx
import React, { useState } from "react";
import axios from "axios";
import "./LockerControl.css";

// ✅ Use environment variable or fallback to your deployed backend
const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://luggo-backend-cpavgbcdhjexexh7.centralindia-01.azurewebsites.net";

function LockerControl() {
  const [status1, setStatus1] = useState("LOCKED");
  const [status2, setStatus2] = useState("LOCKED");
  const [loading, setLoading] = useState(false);

  // ✅ Send command for specific locker
  const sendCommand = async (locker, command) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/${locker}/${command.toLowerCase()}`
      );

      const message =
        response.data?.result?.message ||
        response.data?.message ||
        `Locker ${locker.toUpperCase()} ${command}ED successfully!`;

      if (locker === "locker1") {
        setStatus1(command === "LOCK" ? "LOCKED" : "UNLOCKED");
      } else if (locker === "locker2") {
        setStatus2(command === "LOCK" ? "LOCKED" : "UNLOCKED");
      }

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

      <div className="locker-box">
        <h3>Locker 1</h3>
        <p className="status">
          Status: <strong>{status1}</strong>
        </p>
        <div className="button-group">
          <button
            className="lock-btn"
            disabled={loading}
            onClick={() => sendCommand("locker1", "LOCK")}
          >
            🔒 Lock
          </button>
          <button
            className="unlock-btn"
            disabled={loading}
            onClick={() => sendCommand("locker1", "UNLOCK")}
          >
            🔓 Unlock
          </button>
        </div>
      </div>

      <div className="locker-box">
        <h3>Locker 2</h3>
        <p className="status">
          Status: <strong>{status2}</strong>
        </p>
        <div className="button-group">
          <button
            className="lock-btn"
            disabled={loading}
            onClick={() => sendCommand("locker2", "LOCK")}
          >
            🔒 Lock
          </button>
          <button
            className="unlock-btn"
            disabled={loading}
            onClick={() => sendCommand("locker2", "UNLOCK")}
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
