const scheduleService = require("../services/schedule");
const response = require("../helpers/response");

const scheduleController = () => {

  const create = async (req, res) => {
    const data = req.body;
    try {
      const schedule = await scheduleService.create(data);

      return response.jsonSuccess(
        res,
        schedule,
        "Successfully created schedule.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const getAllByCentreId = async (req, res) => {
    const centreId = req.params.id;
    try {
      let schedules = [];
      if (req.query.date) {
        schedules = await scheduleService.getAllByCentreIdAndDate(centreId, req.query.date);
      } else {
        schedules = await scheduleService.getDistinctDatesByCentreId(centreId);
      }

      return response.jsonSuccess(
        res,
        schedules,
        "Successfully fetched all schedules.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const getDistinctDatesByCentreId = async (req, res) => {
    const centreId = req.params.id;
    try {
      const schedules = await scheduleService.getDistinctDatesByCentreId(centreId);

      return response.jsonSuccess(
        res,
        schedules,
        "Successfully fetched all schedules.",
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
      const schedules = await scheduleService.findAvailableSlotsByCentreIdAndDate(centreId, date);

      return response.jsonSuccess(
        res,
        schedules,
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
      const schedule = await scheduleService.findById(id);

      return response.jsonSuccess(
        res,
        schedule,
        "Successfully fetched schedule.",
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
      const schedule = await scheduleService.update(id, data);

      return response.jsonSuccess(
        res,
        schedule,
        "Successfully updated schedule.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const remove = async (req, res) => {
    const id = req.params.id;
    try {
      const schedule = await scheduleService.remove(id);

      return response.jsonSuccess(
        res,
        schedule,
        "Successfully removed schedule.",
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
    update,
    remove,
  };
};

module.exports = scheduleController();
