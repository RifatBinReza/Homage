const express = require("express");
const router = express.Router();

/**
 * Import controllers
 */
const userController = require("../controllers/user");
const centreController = require("../controllers/centre");
const patientController = require("../controllers/patient");

// Routes
router.get("/login", userController.loginView);
router.get("/dashboard", userController.dashboardView);
router.get("/centres/:id", centreController.centreView);
router.get("/bookings", patientController.bookingView);

module.exports = router