const centreRepository = require("../repositories/centre");

const centreService = () => {

  const create = async (data) => {
    const centre = await centreRepository.create(data);

    console.log('Create centre: ', centre)

    return centre;
  }

  const getAll = async () => {
    const centres = await centreRepository.getAll();

    console.log('All centres: ', centres)

    return centres;
  }

  const findById = async (id) => {
    const centre = await centreRepository.findById(id);

    console.log("Get centre: ", centre);

    return centre;
  };

  const update = async (id, data) => {
    const centre = await centreRepository.findById(id);
    if (!centre) {
      throw new Error("Centre not found");
    }

    console.log('Update centre: ', centre)

    const updatedcentre = await centreRepository.update(id, data);

    return updatedcentre;
  }

  const remove = async (id) => {
    const centre = await centreRepository.findById(id);
    if (!centre) {
      throw new Error("Centre not found");
    }

    await centreRepository.remove(id);

    console.log('Remove centre: ', centre)

    return centre;
  }

  return {
    create,
    getAll,
    findById,
    update,
    remove,
  };
};

module.exports = centreService();
