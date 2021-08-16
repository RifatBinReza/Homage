module.exports = (Sequelize, DataTypes) => {
  const Address = Sequelize.define(
    "address",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      line1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      line2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "addresses",
      timestamps: true
    }
  );

  Address.associate = function (models) {
    Address.belongsTo(models.centre);
  };

  return Address;
};
