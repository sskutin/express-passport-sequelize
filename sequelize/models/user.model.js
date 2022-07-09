const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
    },
    role: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  });
};
