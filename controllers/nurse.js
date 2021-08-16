const nurseService = require("../services/nurse");
const response = require("../helpers/response");

const nurseController = () => {

  const create = async (req, res) => {
    const data = req.body;
    try {
      const nurse = await nurseService.create(data);

      return response.jsonSuccess(
        res,
        nurse,
        "Successfully created nurse.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const getAll = async (req, res) => {
    try {
      const nurses = await nurseService.getAll();

      return response.jsonSuccess(
        res,
        nurses,
        "Successfully fetched all nurses.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const findById = async (req, res) => {
    const id = req.params.id;
    try {
      const nurse = await nurseService.findById(id);

      return response.jsonSuccess(
        res,
        nurse,
        "Successfully fetched nurse.",
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
      const nurse = await nurseService.update(id, data);

      return response.jsonSuccess(
        res,
        nurse,
        "Successfully updated nurse.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const remove = async (req, res) => {
    const id = req.params.id;
    try {
      const nurse = await nurseService.remove(id);

      return response.jsonSuccess(
        res,
        nurse,
        "Successfully removed nurse.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  return {
    create,
    getAll,
    findById,
    update,
    remove,
  };
};

module.exports = nurseController();
