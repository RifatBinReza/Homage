const { models } = require("../models");
const Sequelize = require("sequelize");
const moment = require("moment");

const bookingRepository = () => {
  const create = (data) => {
    return models.booking.create(data);
  };

  const findById = (id) => {
    return models.booking.findOne({
      where: {
        id: id,
      }
    });
  };

  const getByPatientId = (patientId) => {
    return models.booking.findAll({
      where: {
        patientId: patientId,
      }
    });
  };

  const findByPatientIdAndBookingId = (patientId, bookingId) => {
    return models.booking.findAll({
      where: {
        patientId: patientId,
        id: bookingId,
      },
    });
  };

  const getAllByDateAndCentre = (date, centreId) => {
    const startTime = moment(date).startOf("day");
    const endTime = moment(date).endOf("day").subtract(30, "minutes");

    return models.booking.findAll({
      where: {
        startTime: { [Sequelize.Op.between]: [startTime, endTime] },
        centreId: centreId,
      },
      order: [["startTime", "ASC"]],
    });
  };

  const getAllByStartTimeAndCentre = (startTime, centreId) => {
    return models.booking.findAll({
      where: {
        startTime: startTime,
        centreId: centreId,
      },
    });
  };

  const update = async (data) => {
    const booking = await models.booking.findOne({
      where: {
        id: id,
      },
    });
    if (!booking) {
      throw new Error('booking not found.')
    }
    return await booking.update(data);
  };

  const remove = (id) => {
    return models.booking.destroy({
      where: {
        id: id,
      },
    });
  };

  return {
    create,
    findById,
    getByPatientId,
    findByPatientIdAndBookingId,
    getAllByDateAndCentre,
    getAllByStartTimeAndCentre,
    update,
    remove,
  };
};

module.exports = bookingRepository();
