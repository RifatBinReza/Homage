const express = require("express");
const router = express.Router();

/**
 * Import routes
 */
const userRoutes = require("./api/user");
const centreRoutes = require("./api/centre");
const nurseRoutes = require("./api/nurse");
const patientRoutes = require("./api/patient");
const publicRoutes = require("./api/public");
const scheduleRoutes = require("./api/schedule");

/**
 * Import controllers
 */
const userController = require("../controllers/user");

/**
 * Import middlewares
 */
const schemaValidator = require("../middlewares/schemaValidator");

// Auth routes
router.post("/login", schemaValidator.loginUserSchema, userController.login);

router.use("/", publicRoutes);
router.use("/secure/users", userRoutes);
router.use("/secure/centres", centreRoutes);
router.use("/secure/nurses", nurseRoutes);
router.use("/secure/patients", patientRoutes);
router.use("/secure/schedules", scheduleRoutes);

module.exports = router