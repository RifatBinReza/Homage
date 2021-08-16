const { models } = require("../models");

const patientRepository = () => {
  const create = (data) => {
    return models.patient.create(data);
  };

  const findById = (id) => {
    return models.patient.findOne({
      where: {
        id: id,
      }
    });
  };

  const findByPhoneAndIcNumber = (phone, icNumber) => {
    return models.patient.findOne({
      where: {
        phone: phone,
        icNumber: icNumber
      },
    });
  };

  const getAll = () => {
    return models.patient.findAll();
  };

  const update = async (data) => {
    const patient = await models.patient.findOne({
      where: {
        id: id,
      },
    });
    if (!patient) {
      throw new Error('patient not found.')
    }
    return await patient.update(data);
  };

  const remove = (id) => {
    return models.patient.destroy({
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
    findByPhoneAndIcNumber,
  };
};

module.exports = patientRepository();
