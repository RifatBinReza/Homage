const bookingService = require("../services/booking");
const response = require("../helpers/response");

const bookingController = () => {

  const create = async (req, res) => {
    const patientId = req.params.id;
    const data = req.body;
    data.patientId = patientId;
    try {
      const booking = await bookingService.create(patientId, data);

      return response.jsonSuccess(
        res,
        booking,
        "Successfully created booking.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const getAllByCentreId = async (req, res) => {
    const centreId = req.params.id;
    try {
      let bookings = [];
      if (req.query.date) {
        bookings = await bookingService.getAllByCentreIdAndDate(centreId, req.query.date);
      } else {
        bookings = await bookingService.getDistinctDatesByCentreId(centreId);
      }

      return response.jsonSuccess(
        res,
        bookings,
        "Successfully fetched all bookings.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const getDistinctDatesByCentreId = async (req, res) => {
    const centreId = req.params.id;
    try {
      const bookings = await bookingService.getDistinctDatesByCentreId(centreId);

      return response.jsonSuccess(
        res,
        bookings,
        "Successfully fetched all bookings.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const findAvailableSlotsByCentreIdAndDate = async (req, res) => {
    const centreId = req.params.id;
    const date = req.query.date;
    try {
      const bookings = await bookingService.findAvailableSlotsByCentreIdAndDate(centreId, date);

      return response.jsonSuccess(
        res,
        bookings,
        "Successfully fetched all available slots.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const findById = async (req, res) => {
    const id = req.params.id;
    try {
      const booking = await bookingService.findById(id);

      return response.jsonSuccess(
        res,
        booking,
        "Successfully fetched booking.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const getBookings = async (req, res) => {
    const patientId = req.params.id;
    try {
      const bookings = await bookingService.getByPatientId(patientId);

      return response.jsonSuccess(
        res,
        bookings,
        "Successfully fetched booking.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const booking = await bookingService.update(id, data);

      return response.jsonSuccess(
        res,
        booking,
        "Successfully updated booking.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const remove = async (req, res) => {
    const patientId = req.params.patientId;
    const bookingId = req.params.bookingId;
    try {

      const booking = await bookingService.remove(patientId, bookingId);

      return response.jsonSuccess(
        res,
        booking,
        "Successfully removed booking.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  return {
    create,
    getAllByCentreId,
    getDistinctDatesByCentreId,
    findAvailableSlotsByCentreIdAndDate,
    findById,
    getBookings,
    update,
    remove,
  };
};

module.exports = bookingController();
