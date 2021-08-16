const { models } = require("../models");

const addressRepository = () => {
  const create = (data) => {
    return models.address.create(data);
  };

  return {
    create,
  };
};

module.exports = addressRepository();
