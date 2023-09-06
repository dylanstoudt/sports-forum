const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Player extends Model {
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ppg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assists: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    rebounds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    steals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    blocks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ranking: {
        type: DataTypes.INTEGER
    },
    team_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'team',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'player',
  }
);

module.exports = Player;