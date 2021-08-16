const express = require("express");
const router = express.Router();

const patientController = require("../../controllers/patient");
const ScheduleController = require("../../controllers/schedule");
const CentreController = require("../../controllers/centre");
const bookingController = require("../../controllers/booking");

/**
 * Import middlewares
 */
const schemaValidator = require("../../middlewares/schemaValidator");

router.post("/patients/verify", patientController.verify);
router.delete("/patients/:patientId/bookings/:bookingId", bookingController.remove);
router.get("/patients/:id/bookings", bookingController.getBookings);
router.post("/patients/:id/bookings", bookingController.create);
router.get("/patients/:id", patientController.findById);
router.get("/centres", CentreController.getAll);
router.get("/centres/:id/available-dates", ScheduleController.getDistinctDatesByCentreId);
router.get("/centres/:id/available-slots", ScheduleController.findAvailableSlotsByCentreIdAndDate);


module.exports = router;