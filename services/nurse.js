const nurseRepository = require("../repositories/nurse");

const nurseService = () => {

  const create = async (data) => {
    const nurse = await nurseRepository.create(data);

    console.log('Create nurse: ', nurse)

    return nurse;
  }

  const getAll = async () => {
    const nurses = await nurseRepository.getAll();

    console.log('All nurses: ', nurses)

    return nurses;
  }

  const findById = async (id) => {
    const nurse = await nurseRepository.findById(id);

    console.log("Get nurse: ", nurse);

    return nurse;
  };

  const update = async (id, data) => {
    const nurse = await nurseRepository.findById(id);
    if (!nurse) {
      throw new Error("nurse not found");
    }

    console.log('Update nurse: ', nurse)

    const updatednurse = await nurseRepository.update(id, data);

    return updatednurse;
  }

  const remove = async (id) => {
    const nurse = await nurseRepository.findById(id);
    if (!nurse) {
      throw new Error("nurse not found");
    }

    await nurseRepository.remove(id);

    console.log('Remove nurse: ', nurse)

    return nurse;
  }

  return {
    create,
    getAll,
    findById,
    update,
    remove,
  };
};

module.exports = nurseService();
