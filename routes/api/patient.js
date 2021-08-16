const express = require("express");
const router = express.Router();

const patientController = require("../../controllers/patient");

/**
 * Import middlewares
 */
const schemaValidator = require("../../middlewares/schemaValidator");

router.get("/", patientController.getAll);
router.post("/", patientController.create);
router.post("/verify", patientController.verify);


module.exports = router;