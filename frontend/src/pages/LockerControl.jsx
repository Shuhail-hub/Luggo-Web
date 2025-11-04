// src/pages/LockerControl.jsx
import React, { useState } from "react";
import axios from "axios";
import "./LockerControl.css";

// ✅ Backend base URL (Azure backend URL)
const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://luggo-backend-cpavgbcdhjexexh7.centralindia-01.azurewebsites.net";

function LockerControl() {
  const [status1, setStatus1] = useState("LOCKED");
  const [status2, setStatus2] = useState("LOCKED");
  const [status3, setStatus3] = useState("LOCKED");
  const [loading, setLoading] = useState(false);

  // ✅ Sends UNLOCK1, UNLOCK2, UNLOCK3 commands to backend
  const sendCommand = async (command) => {
    try {
      setLoading(true);

      // ✅ Map commands to backend endpoints
      let endpoint = "";
      if (command === "UNLOCK1") endpoint = "/api/locker1/unlock";
      else if (command === "UNLOCK2") endpoint = "/api/locker2/unlock";
      else if (command === "UNLOCK3") endpoint = "/api/locker3/unlock";

      const response = await axios.post(`${API_URL}${endpoint}`);

      const message =
        response.data?.result?.message ||
        response.data?.message ||
        `Command ${command} sent successfully!`;

      // ✅ Update locker status (unlocked for 10s, then auto-lock)
      if (command === "UNLOCK1") {
        setStatus1("UNLOCKED");
        setTimeout(() => setStatus1("LOCKED"), 10000);
      } else if (command === "UNLOCK2") {
        setStatus2("UNLOCKED");
        setTimeout(() => setStatus2("LOCKED"), 10000);
      } else if (command === "UNLOCK3") {
        setStatus3("UNLOCKED");
        setTimeout(() => setStatus3("LOCKED"), 10000);
      }

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

      {/* Locker 1 */}
      <div className="locker-box">
        <h3>Locker 1</h3>
        <p className="status">
          Status: <strong>{status1}</strong>
        </p>
        <div className="button-group">
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
            className="unlock-btn"
            disabled={loading}
            onClick={() => sendCommand("UNLOCK2")}
          >
            🔓 Unlock
          </button>
        </div>
      </div>

      {/* Locker 3 */}
      <div className="locker-box">
        <h3>Locker 3</h3>
        <p className="status">
          Status: <strong>{status3}</strong>
        </p>
        <div className="button-group">
          <button
            className="unlock-btn"
            disabled={loading}
            onClick={() => sendCommand("UNLOCK3")}
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
