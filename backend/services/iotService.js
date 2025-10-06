// backend/services/iotService.js
const iothub = require("azure-iothub");
require("dotenv").config();

const connectionString = process.env.IOTHUB_CONNECTION_STRING;
const deviceId = process.env.DEVICE_ID;

// Create IoT service client
const serviceClient = iothub.Client.fromConnectionString(connectionString);

// Function to send message to IoT device
async function sendToDevice(command) {
  return new Promise((resolve, reject) => {
    const message = new iothub.Message(command);
    console.log(`[IoT] Sending message to device: ${command}`);

    serviceClient.open((err) => {
      if (err) {
        console.error("[IoT] Connection Error:", err.message);
        return reject(err);
      }

      serviceClient.send(deviceId, message, (err) => {
        if (err) {
          console.error("[IoT] Send Error:", err.message);
          reject(err);
        } else {
          console.log("[IoT] Message sent successfully!");
          resolve({ success: true, message: `Command '${command}' sent.` });
        }
      });
    });
  });
}

module.exports = { sendToDevice };
