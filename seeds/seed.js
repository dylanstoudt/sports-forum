const sequelize = require('../config/connection');
const { User, Player, Team } = require('../models');

const userData = require('./userData.json');
const teamData = require('./teamData.json');
const playerData = require('./playerData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const team = await Team.bulkCreate(teamData, {
    individualHooks: true,
    returning: true,
  })
  const player = await Player.bulkCreate(playerData, {
    individualHooks: true,
    returning: true,
  })

  process.exit(0);
};

seedDatabase();
