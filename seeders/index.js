const { models } = require("../models");

/**
 * Connect to the database instance
 */
const seedDB = async () => {
  try {
    const users = [
      {
        firstName: "Rifat Bin",
        lastName: "Reza",
        password: "Test1234",
        email: "rifatbinreza@gmail.com"
      },
    ];
    
    users.forEach(async (user) => {
      const existingUser = await models.user.findOne({email: user.email});
      if (!existingUser) {
        await models.user.create(user);
      }
    })
  } catch (err) {
    console.error(`Seeding Error: ${err.message}`);
    throw err;
  }
};

module.exports = { seedDB };
