const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const config = require('../config');
const { applyExtraSetup } = require("./extra-setup");
const Roles = require("../permissions/roles");

const { NODE_ENV } = process.env;
const { host, port, user, password, database } = config.database;
const sequelize = new Sequelize(database, user, password, { dialect: 'mysql', host });

const isDev = NODE_ENV === "development";

(async () => {
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const modelDefiners = [
        require('./models/schedule.model'),
        require('./models/user.model'),
    ];
    for (const modelDefiner of modelDefiners) {
        modelDefiner(sequelize);
    }

    applyExtraSetup(sequelize);

    await sequelize.sync({ force: isDev });

    // Creating default admin user
    const adminUser = await sequelize.models.user.findOne({ where: { username: "admin" } });
    if (!adminUser) {
        await sequelize.models.user.create({ username: "admin", password: "password", role: Roles.Admin });
    }
})();

module.exports = sequelize;