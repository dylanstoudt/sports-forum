const User = require('./User');
const Team = require('./Team');
const Player = require('./Player');
const PlayersTeam = require('./PlayersTeam');

User.hasOne(Team, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Team.belongsTo(User, {
  foreignKey: 'user_id'
});

Team.belongsToMany(Player, {
  foreignKey: 'team_id',
  through: PlayersTeam
})

Player.belongsToMany(Team, {
  foreignKey: 'player_id',
  through: PlayersTeam
})

module.exports = { User, Team, Player, PlayersTeam };
