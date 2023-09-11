const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PlayersTeam extends Model {
}

PlayersTeam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    team_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'team',
            key: 'id'
        }
    },
    player_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'player',
            key: 'id'
        }
    },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'playersteam',
  }
);

module.exports = PlayersTeam;
