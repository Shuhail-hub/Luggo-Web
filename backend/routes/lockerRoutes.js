// backend/routes/lockerRoutes.js
const express = require("express");
const router = express.Router();
const {
  lockLocker1,
  unlockLocker1,
  lockLocker2,
  unlockLocker2,
} = require("../controllers/lockerController");

/**
 * @swagger
 * tags:
 *   name: Locker
 *   description: Locker control endpoints (for multiple lockers)
 */

// ===== Locker 1 Routes =====
/**
 * @swagger
 * /api/locker1/lock:
 *   post:
 *     summary: Send LOCK1 command to ESP32 (Locker 1)
 *     tags: [Locker]
 *     responses:
 *       200:
 *         description: Locker 1 locked successfully
 */
router.post("/locker1/lock", lockLocker1);

/**
 * @swagger
 * /api/locker1/unlock:
 *   post:
 *     summary: Send UNLOCK1 command to ESP32 (Locker 1)
 *     tags: [Locker]
 *     responses:
 *       200:
 *         description: Locker 1 unlocked successfully
 */
router.post("/locker1/unlock", unlockLocker1);

// ===== Locker 2 Routes =====
/**
 * @swagger
 * /api/locker2/lock:
 *   post:
 *     summary: Send LOCK2 command to ESP32 (Locker 2)
 *     tags: [Locker]
 *     responses:
 *       200:
 *         description: Locker 2 locked successfully
 */
router.post("/locker2/lock", lockLocker2);

/**
 * @swagger
 * /api/locker2/unlock:
 *   post:
 *     summary: Send UNLOCK2 command to ESP32 (Locker 2)
 *     tags: [Locker]
 *     responses:
 *       200:
 *         description: Locker 2 unlocked successfully
 */
router.post("/locker2/unlock", unlockLocker2);

module.exports = router;
