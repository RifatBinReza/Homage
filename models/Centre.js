module.exports = (Sequelize, DataTypes) => {
  const Centre = Sequelize.define(
    "centre",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      tableName: "centres",
      timestamps: true
    }
  );

  Centre.associate = function (models) {
    Centre.hasOne(models.address, { onDelete: "cascade" });
  };

  return Centre;
};
