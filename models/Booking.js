module.exports = (Sequelize, DataTypes) => {
  const Booking = Sequelize.define(
    "booking",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "bookings",
    }
  );

  Booking.associate = function (models) {
    Booking.belongsTo(models.patient);
    Booking.belongsTo(models.centre);
  };

  return Booking;
};
