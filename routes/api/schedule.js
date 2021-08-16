const express = require("express");
const router = express.Router();

const scheduleController = require("../../controllers/schedule");

/**
 * Import middlewares
 */
const schemaValidator = require("../../middlewares/schemaValidator");

router.get("/", scheduleController.getAllByCentreId);
router.post("/", scheduleController.create);


module.exports = router;