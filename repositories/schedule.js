const { models } = require("../models");
const Sequelize = require("sequelize");
const moment = require("moment");

const scheduleRepository = () => {
  const create = (data) => {
    return models.schedule.create(data);
  };

  const findById = (id) => {
    return models.schedule.findOne({
      where: {
        id: id,
      },
      include: [
        { model: models.address},
      ],
    });
  };

  const getDistinctDatesByCentreId = (centreId) => {
    return models.schedule.findAll({
      where: {
        centreId: centreId,
      },
      attributes: [Sequelize.fn("DISTINCT", Sequelize.col("date")), "date"],
      order: [["date", "ASC"]],
    });
  };

  const getAllByCentreIdAndDate = (centreId, date) => {
    const startTime = moment(date).startOf("day");
    const endTime = moment(date).endOf("day").subtract(30, "minutes");

    return models.schedule.findAll({
      where: {
        centreId: centreId,
        startTime: { [Sequelize.Op.between]: [startTime, endTime] },
      },
      include: [{ model: models.nurse }],
      order: [["startTime", "ASC"]],
    });
  };

  const getAllByStartTimeAndCentreId = (startTime, centreId) => {
    return models.schedule.findAll({
      where: {
        startTime: {
          [Sequelize.Op.lte]: moment(startTime),
        },
        endTime: {
          [Sequelize.Op.gt]: moment(startTime),
        },
        centreId: centreId,
      },
      order: [["startTime", "ASC"]],
    });
  };

  const update = async (data) => {
    const schedule = await models.schedule.findOne({
      where: {
        id: id,
      },
    });
    if (!schedule) {
      throw new Error('schedule not found.')
    }
    return await schedule.update(data);
  };

  const remove = (id) => {
    return models.schedule.destroy({
      where: {
        id: id,
      },
    });
  };

  return {
    create,
    findById,
    getDistinctDatesByCentreId,
    getAllByCentreIdAndDate,
    getAllByStartTimeAndCentreId,
    update,
    remove,
  };
};

module.exports = scheduleRepository();
