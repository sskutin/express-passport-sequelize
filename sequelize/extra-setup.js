function applyExtraSetup(sequelize) {
    const { user, schedule } = sequelize.models;

    user.hasMany(schedule);
    schedule.belongsTo(user);
}

module.exports = { applyExtraSetup };