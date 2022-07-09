const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('schedule', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    workDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    shiftLength: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        min: 1,
        max: 24,
      },
    },
  });
};
