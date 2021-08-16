const patientService = require("../services/patient");
const response = require("../helpers/response");

const patientController = () => {

  const create = async (req, res) => {
    const data = req.body;
    try {
      const patient = await patientService.create(data);

      return response.jsonSuccess(
        res,
        patient,
        "Successfully created patient.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const getAll = async (req, res) => {
    try {
      const patients = await patientService.getAll();

      return response.jsonSuccess(
        res,
        patients,
        "Successfully fetched all patients.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const findById = async (req, res) => {
    const id = req.params.id;
    try {
      const patient = await patientService.findById(id);

      return response.jsonSuccess(
        res,
        patient,
        "Successfully fetched patient.",
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
      const patient = await patientService.update(id, data);

      return response.jsonSuccess(
        res,
        patient,
        "Successfully updated patient.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const remove = async (req, res) => {
    const id = req.params.id;
    try {
      const patient = await patientService.remove(id);

      return response.jsonSuccess(
        res,
        patient,
        "Successfully removed patient.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const verify = async (req, res) => {
    const phone = req.body.phone;
    const icNumber = req.body.icNumber;
    try {
      const patient = await patientService.verify(phone, icNumber);

      return response.jsonSuccess(
        res,
        patient,
        "Successfully verified patient.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const bookingView = async (req, res) => {
    if (req.query.patientId) {
      res.render("bookingSlots");
    } else {
      res.render("booking");
    }
  };

  return {
    create,
    getAll,
    findById,
    update,
    remove,
    bookingView,
    verify,
  };
};

module.exports = patientController();
