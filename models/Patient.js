module.exports = (Sequelize, DataTypes) => {
  const Patient = Sequelize.define(
    "patient",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );

  return Patient;
};
