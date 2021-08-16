const centreService = require("../services/centre");
const response = require("../helpers/response");

const centreController = () => {

  const create = async (req, res) => {
    const data = req.body;
    try {
      const centre = await centreService.create(data);

      return response.jsonSuccess(
        res,
        centre,
        "Successfully created centre.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const getAll = async (req, res) => {
    try {
      const centres = await centreService.getAll();

      return response.jsonSuccess(
        res,
        centres,
        "Successfully fetched all centres.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const findById = async (req, res) => {
    const id = req.params.id;
    try {
      const centre = await centreService.findById(id);

      return response.jsonSuccess(
        res,
        centre,
        "Successfully fetched centre.",
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
      const centre = await centreService.update(id, data);

      return response.jsonSuccess(
        res,
        centre,
        "Successfully updated centre.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const remove = async (req, res) => {
    const id = req.params.id;
    try {
      const centre = await centreService.remove(id);

      return response.jsonSuccess(
        res,
        centre,
        "Successfully removed centre.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const centreView = async (req, res) => {
    res.render("centre");
  };

  return {
    create,
    getAll,
    findById,
    update,
    remove,
    centreView,
  };
};

module.exports = centreController();
