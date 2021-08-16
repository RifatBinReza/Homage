const { models } = require("../models");

const centreRepository = () => {
  const create = (data) => {
    return models.centre.create(data, {include: models.address});
  };

  const findById = (id) => {
    return models.centre.findOne({
      where: {
        id: id,
      },
      include: [
        { model: models.address},
      ],
    });
  };

  const getAll = () => {
    return models.centre.findAll({
      include: [
        { model: models.address},
      ],
    });
  };

  const update = async (data) => {
    const centre = await models.centre.findOne({
      where: {
        id: id,
      },
    });
    if (!centre) {
      throw new Error('centre not found.')
    }
    return await centre.update(data);
  };

  const remove = (id) => {
    // TODO: Here we should cascade delete everything associated to this centre and take necessary business actions to exisitng user bookings
    return models.centre.destroy({
      where: {
        id: id,
      },
    });
  };

  return {
    create,
    findById,
    getAll,
    update,
    remove,
  };
};

module.exports = centreRepository();
