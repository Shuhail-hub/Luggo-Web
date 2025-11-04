// backend/routes/lockerRoutes.js
const express = require("express");
const router = express.Router();
const {
  unlockLocker1,
  unlockLocker2,
  unlockLocker3,
} = require("../controllers/lockerController");

/**
 * @swagger
 * tags:
 *   name: Locker
 *   description: Locker control endpoints (auto-lock enabled)
 */

// ===== Locker 1 =====
/**
 * @swagger
 * /api/locker1/unlock:
 *   post:
 *     summary: Send UNLOCK1 command to ESP32 (Locker 1)
 *     tags: [Locker]
 *     responses:
 *       200:
 *         description: Locker 1 unlocked successfully (auto-lock after 10s)
 */
router.post("/locker1/unlock", unlockLocker1);

// ===== Locker 2 =====
/**
 * @swagger
 * /api/locker2/unlock:
 *   post:
 *     summary: Send UNLOCK2 command to ESP32 (Locker 2)
 *     tags: [Locker]
 *     responses:
 *       200:
 *         description: Locker 2 unlocked successfully (auto-lock after 10s)
 */
router.post("/locker2/unlock", unlockLocker2);

// ===== Locker 3 =====
/**
 * @swagger
 * /api/locker3/unlock:
 *   post:
 *     summary: Send UNLOCK3 command to ESP32 (Locker 3)
 *     tags: [Locker]
 *     responses:
 *       200:
 *         description: Locker 3 unlocked successfully (auto-lock after 10s)
 */
router.post("/locker3/unlock", unlockLocker3);

module.exports = router;
