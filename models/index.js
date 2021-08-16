const Sequelize = require("sequelize");
/**
 * Connect to the database instance
 */
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
  }
);

/**
 * Get all the models for exporting
 */
const models = {
  user: require("./User")(sequelize, Sequelize),
  address: require("./Address")(sequelize, Sequelize),
  booking: require("./Booking")(sequelize, Sequelize),
  centre: require("./Centre")(sequelize, Sequelize),
  nurse: require("./Nurse")(sequelize, Sequelize),
  patient: require("./Patient")(sequelize, Sequelize),
  schedule: require("./Schedule")(sequelize, Sequelize),
};

/**
 * Loop through all the models and associate the defined relationships
 */
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, models };
