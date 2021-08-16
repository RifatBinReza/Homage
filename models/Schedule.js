module.exports = (Sequelize, DataTypes) => {
  const Schedule = Sequelize.define(
    "schedule",
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
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "schedules",
    }
  );

  Schedule.associate = function (models) {
    Schedule.belongsTo(models.nurse);
    Schedule.belongsTo(models.centre);
  };

  return Schedule;
};
