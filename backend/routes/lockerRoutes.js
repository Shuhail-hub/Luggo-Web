// backend/routes/lockerRoutes.js
const express = require("express");
const router = express.Router();
const { lockLocker, unlockLocker } = require("../controllers/lockerController");

/**
 * @swagger
 * tags:
 *   name: Locker
 *   description: Locker control endpoints
 */

/**
 * @swagger
 * /api/locker/lock:
 *   post:
 *     summary: Send LOCK command to ESP32
 *     tags: [Locker]
 *     responses:
 *       200:
 *         description: Locker locked successfully
 */
router.post("/lock", lockLocker);

/**
 * @swagger
 * /api/locker/unlock:
 *   post:
 *     summary: Send UNLOCK command to ESP32
 *     tags: [Locker]
 *     responses:
 *       200:
 *         description: Locker unlocked successfully
 */
router.post("/unlock", unlockLocker);

module.exports = router;
