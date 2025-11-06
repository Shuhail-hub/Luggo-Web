// backend/controllers/lockerController.js
const { sendToDevice } = require("../services/iotService");

// ========== Locker 1 ==========
exports.unlockLocker1 = async (req, res) => {
  try {
    const result = await sendToDevice("UNLOCK1");
    res
      .status(200)
      .json({ status: "success", locker: 1, action: "UNLOCK1", result });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", locker: 1, message: error.message });
  }
};

// ========== Locker 2 ==========
exports.unlockLocker2 = async (req, res) => {
  try {
    const result = await sendToDevice("UNLOCK2");
    res
      .status(200)
      .json({ status: "success", locker: 2, action: "UNLOCK2", result });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", locker: 2, message: error.message });
  }
};

// ========== Locker 3 ==========
exports.unlockLocker3 = async (req, res) => {
  try {
    const result = await sendToDevice("UNLOCK3");
    res
      .status(200)
      .json({ status: "success", locker: 3, action: "UNLOCK3", result });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", locker: 3, message: error.message });
  }
};

// ========== RESET (Motor Down) ==========
exports.resetDoor = async (req, res) => {
  try {
    const result = await sendToDevice("RESET"); // <--- sends RESET to ESP32
    res
      .status(200)
      .json({ status: "success", action: "RESET", result });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message });
  }
};
