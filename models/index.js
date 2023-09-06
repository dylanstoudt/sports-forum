const User = require('./User');
const Team = require('./Team');
const Player = require('./Player')

User.hasOne(Team, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Team.belongsTo(User, {
  foreignKey: 'user_id'
});

Team.hasMany(Player, {
  foreignKey: 'user_id'
})

Player.belongsTo(Team, {
  foreignKey: 'user_id'
})

module.exports = { User, Team, Player };
