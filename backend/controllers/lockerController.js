// backend/controllers/lockerController.js
const { sendToDevice } = require("../services/iotService");

// ========== Locker 1 ==========
exports.lockLocker1 = async (req, res) => {
  try {
    const result = await sendToDevice("LOCK1");
    res.status(200).json({ status: "success", locker: 1, action: "LOCK1", result });
  } catch (error) {
    res.status(500).json({ status: "error", locker: 1, message: error.message });
  }
};

exports.unlockLocker1 = async (req, res) => {
  try {
    const result = await sendToDevice("UNLOCK1");
    res.status(200).json({ status: "success", locker: 1, action: "UNLOCK1", result });
  } catch (error) {
    res.status(500).json({ status: "error", locker: 1, message: error.message });
  }
};

// ========== Locker 2 ==========
exports.lockLocker2 = async (req, res) => {
  try {
    const result = await sendToDevice("LOCK2");
    res.status(200).json({ status: "success", locker: 2, action: "LOCK2", result });
  } catch (error) {
    res.status(500).json({ status: "error", locker: 2, message: error.message });
  }
};

exports.unlockLocker2 = async (req, res) => {
  try {
    const result = await sendToDevice("UNLOCK2");
    res.status(200).json({ status: "success", locker: 2, action: "UNLOCK2", result });
  } catch (error) {
    res.status(500).json({ status: "error", locker: 2, message: error.message });
  }
};
