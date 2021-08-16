const express = require("express");
const router = express.Router();

const nurseController = require("../../controllers/nurse");

/**
 * Import middlewares
 */
const schemaValidator = require("../../middlewares/schemaValidator");

router.get("/", nurseController.getAll);
router.post("/", nurseController.create);


module.exports = router;