const { models } = require("../models");

const nurseRepository = () => {
  const create = (data) => {
    return models.nurse.create(data);
  };

  const findById = (id) => {
    return models.nurse.findOne({
      where: {
        id: id,
      }
    });
  };

  const getByNurseId = (nurseId) => {
    return models.nurse.findOne({
      where: {
        nurseId: nurseId,
      },
    });
  };

  const getAll = () => {
    return models.nurse.findAll();
  };

  const update = async (data) => {
    const nurse = await models.nurse.findOne({
      where: {
        id: id,
      },
    });
    if (!nurse) {
      throw new Error('nurse not found.')
    }
    return await nurse.update(data);
  };

  const remove = (id) => {
    return models.nurse.destroy({
      where: {
        id: id,
      },
    });
  };

  return {
    create,
    findById,
    getByNurseId,
    getAll,
    update,
    remove,
  };
};

module.exports = nurseRepository();
