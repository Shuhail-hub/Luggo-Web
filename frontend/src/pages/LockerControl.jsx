import React, { useState } from "react";
import axios from "axios";
import "./LockerControl.css";

const API_URL = process.env.REACT_APP_API_URL || "https://sample-backend.azurewebsites.net";

function LockerControl() {
  const [status, setStatus] = useState("LOCKED");
  const [loading, setLoading] = useState(false);

  const sendCommand = async (command) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/locker/${command.toLowerCase()}`);
      setStatus(command === "LOCK" ? "LOCKED" : "UNLOCKED");
      alert(response.data.message || `Locker ${command}ED successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to send command to locker!");
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
        <button className="lock-btn" disabled={loading} onClick={() => sendCommand("LOCK")}>
          🔒 Lock
        </button>
        <button className="unlock-btn" disabled={loading} onClick={() => sendCommand("UNLOCK")}>
          🔓 Unlock
        </button>
      </div>
    </div>
  );
}

export default LockerControl;
