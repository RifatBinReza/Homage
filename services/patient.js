const patientRepository = require("../repositories/patient");

const patientService = () => {

  const create = async (data) => {
    const patient = await patientRepository.create(data);

    console.log('Create patient: ', patient)

    return patient;
  }

  const getAll = async () => {
    const patients = await patientRepository.getAll();

    console.log('All patients: ', patients)

    return patients;
  }

  const findById = async (id) => {
    const patient = await patientRepository.findById(id);

    console.log("Get patient: ", patient);

    return patient;
  };

  const update = async (id, data) => {
    const patient = await patientRepository.findById(id);
    if (!patient) {
      throw new Error("patient not found");
    }

    console.log('Update patient: ', patient)

    const updatedpatient = await patientRepository.update(id, data);

    return updatedpatient;
  }

  const remove = async (id) => {
    const patient = await patientRepository.findById(id);
    if (!patient) {
      throw new Error("patient not found");
    }

    await patientRepository.remove(id);

    console.log('Remove patient: ', patient)

    return patient;
  }

  const verify = async (phone, icNumber) => {
    const patient = await patientRepository.findByPhoneAndIcNumber(phone, icNumber);
    if (!patient) {
      throw new Error("patient not found");
    }

    console.log("Verify patient: ", patient);

    return patient;
  };

  return {
    create,
    getAll,
    findById,
    update,
    remove,
    verify,
  };
};

module.exports = patientService();
