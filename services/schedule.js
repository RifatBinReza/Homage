const scheduleRepository = require("../repositories/schedule");
const nurseRepository = require("../repositories/nurse");
const bookingRepository = require("../repositories/booking");
const moment = require("moment");

const scheduleService = () => {

  const create = async (data) => {
    const nurse = await nurseRepository.getByNurseId(data.nurseId);
    if (!nurse) {
      throw new Error("Nurse not found");
    }
    // Set the nurse table ID as foreign key
    data.nurseId = nurse.id

    const schedule = await scheduleRepository.create(data);

    console.log('Create schedule: ', schedule)

    return schedule;
  }

  const getDistinctDatesByCentreId = async (centreId) => {
    const schedules = await scheduleRepository.getDistinctDatesByCentreId(centreId);

    console.log('All schedules: ', schedules)

    return schedules;
  }

  const getAllByCentreIdAndDate = async (centreId, date) => {
    const schedules = await scheduleRepository.getAllByCentreIdAndDate(centreId, date);

    console.log("All schedules: ", schedules);

    return schedules;
  };

  const findAvailableSlotsByCentreIdAndDate = async (centreId, date) => {
    const schedules = await scheduleRepository.getAllByCentreIdAndDate(
      centreId,
      date
    );

    const bookings = await bookingRepository.getAllByDateAndCentre(date, centreId);

    console.log("dsfsdfsdfsdfsdf", schedules);

    // We'll create 30 mins intervl slots for entire day and map all the available nurses schedules in those slots. IE. at 9am there are 3 nurses woring, so we'll add 3 available seats for 9am slot
    const slots = {};
    
    let currentTime = moment(date).startOf("day");
    for (let i = 0; i < 48; i++) {
      // Keep ISO string of date for better parsing in the frontend
      if (!slots[currentTime.toISOString()]) slots[currentTime.toISOString()] = 0;
      schedules.forEach((schedule) => {
        let startTime = moment(schedule.startTime);
        let endTime = moment(schedule.endTime);
        let currentEndTime = currentTime.clone().add(30, 'minutes');
        // If there's nurses available in this time, we add 1 seat for each nurse
        if (startTime <= currentTime && endTime >= currentEndTime) {
          slots[currentTime.toISOString()] = slots[currentTime.toISOString()] + 1;
        }
      });

      // Assuming for each 30 min slots, 1 nurse can provice service to 3 patients. So, we'll multiply each nurse by 3 for each slots
      slots[currentTime.toISOString()] = slots[currentTime.toISOString()] * 3;
      currentTime.add(30, "minutes");
    }

    bookings.forEach(booking => {
      // If there's a slot which is already booked by a patient, we'll reduce that slots capacity by 1
      if (slots[moment(booking.startTime).toISOString()]) {
        slots[moment(booking.startTime).toISOString()] =
          slots[moment(booking.startTime).toISOString()] - 1;
      }
    });

    console.log("All available slots: ", slots);

    return slots;
  };

  const isSlotAvailable = async (startTime, centreId) => {
    const bookings = await bookingRepository.getAllByStartTimeAndCentre(startTime, centreId);

    const schedules = await scheduleRepository.getAllByStartTimeAndCentreId(startTime, centreId);

    // If there's more booking than available slots from nurse schedule, then there's no slots available
    if (schedules.length * 3 <= bookings.length) {
      return false;
    }

    return true;
  };

  const findById = async (id) => {
    const schedule = await scheduleRepository.findById(id);

    console.log("Get schedule: ", schedule);

    return schedule;
  };

  const update = async (id, data) => {
    const schedule = await scheduleRepository.findById(id);
    if (!schedule) {
      throw new Error("schedule not found");
    }

    console.log('Update schedule: ', schedule)

    const updatedschedule = await scheduleRepository.update(id, data);

    return updatedschedule;
  }

  const remove = async (id) => {
    const schedule = await scheduleRepository.findById(id);
    if (!schedule) {
      throw new Error("schedule not found");
    }

    await scheduleRepository.remove(id);

    console.log('Remove schedule: ', schedule)

    return schedule;
  }

  return {
    create,
    getDistinctDatesByCentreId,
    getAllByCentreIdAndDate,
    findAvailableSlotsByCentreIdAndDate,
    findById,
    update,
    remove,
    isSlotAvailable,
  };
};

module.exports = scheduleService();
