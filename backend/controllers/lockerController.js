// backend/controllers/lockerController.js
const { sendToDevice } = require("../services/iotService");

exports.lockLocker = async (req, res) => {
  try {
    const result = await sendToDevice("LOCK");
    res.status(200).json({ status: "success", action: "LOCK", result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


exports.unlockLocker = async (req, res) => {
  try {
    const result = await sendToDevice("UNLOCK");
    res.status(200).json({ status: "success", action: "UNLOCK", result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
