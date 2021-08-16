const bookingRepository = require("../repositories/booking");
const patientRepository = require("../repositories/patient");
const scheduleService = require("../services/schedule");
const moment = require("moment");

const bookingService = () => {

  const create = async (patientId, data) => {
    const patient = await patientRepository.findById(patientId);
    if (!patient) {
      throw new Error("Patient not found");
    }

    const patientBookings = await bookingRepository.getByPatientId(patientId);

    // Throw error if the patient already has 2 bookings
    if (patientBookings.length > 1) {
      throw new Error("Patient already has two bookings")
    }

    const isSlotAvailable = await scheduleService.isSlotAvailable(moment(data.startTime), data.centreId);

    if (!isSlotAvailable) {
      throw new Error("The slot is not available");
    }

    data.startTime = moment(data.startTime);
    data.endTime = moment(data.startTime).clone().add(30, 'minutes');

    const booking = await bookingRepository.create(data);

    console.log('Create booking: ', booking)

    return booking;
  }

  const findById = async (id) => {
    const booking = await bookingRepository.findById(id);

    console.log("Get booking: ", booking);

    return booking;
  };

  const getByPatientId = async (patientId) => {
    const bookings = await bookingRepository.getByPatientId(patientId);

    console.log("Get booking: ", bookings);

    return bookings;
  };

  const update = async (id, data) => {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw new Error("booking not found");
    }

    console.log('Update booking: ', booking)

    const updatedbooking = await bookingRepository.update(id, data);

    return updatedbooking;
  }

  const remove = async (patientId, bookingId) => {
    const booking = await bookingRepository.findByPatientIdAndBookingId(
      patientId,
      bookingId
    );
    if (!booking) {
      throw new Error("booking not found");
    }

    await bookingRepository.remove(bookingId);

    console.log("Remove booking: ", booking);

    return booking;
  };

  return {
    create,
    findById,
    getByPatientId,
    update,
    remove,
  };
};

module.exports = bookingService();
