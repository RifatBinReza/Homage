const express = require("express");
const router = express.Router();

const centreController = require("../../controllers/centre");
const scheduleController = require("../../controllers/schedule");

/**
 * Import middlewares
 */
const schemaValidator = require("../../middlewares/schemaValidator");

router.get("/", centreController.getAll);
router.get("/:id/schedules", scheduleController.getAllByCentreId);
router.post("/", centreController.create);


module.exports = router;