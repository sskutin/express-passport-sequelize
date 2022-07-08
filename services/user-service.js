const { models } = require('../sequelize');
const NotFoundError = require('../errors/not-found-error');
const { Op, fn, col } = require("sequelize");

const userFormatter = (user) => {
    if (!user) {
        return null;
    }

    return { id: user.id, username: user.username, role: user.role };
};

const userService = {
    async createUser({ username, password, role }) {
        const user = await models.user.create({ username, password, role });
        return userFormatter(user);
    },

    async getUsers() {
        const users = await models.user.findAll();
        return users.map(userFormatter);
    },

    async getUsersWithSchedules({ fromDate, toDate }) {
        const users = await models.user.findAll({
            attributes: [
                'id',
                'username',
                'role',
                [fn('SUM', col('schedules.shiftLength')), 'totalShiftLength']
            ],
            include: {
                model: models.schedule,
                attributes: [],
                where: {
                    workDate: {
                        [Op.gte]: fromDate,
                        [Op.lte]: toDate,
                    }
                }
            },
            group: ['user.id'],
            order: [[fn('SUM', col('schedules.shiftLength')), 'DESC']],
        })

        return users;
    },

    async getUserById(userId) {
        const user = await models.user.findByPk(userId);
        return userFormatter(user);
    },

    async getUserByUsernamePassword({ username, password }) {
        const user = await models.user.findOne({ where: { username, password } });
        return userFormatter(user);
    },

    async updateUser({ id, username, password, role }) {
        const user = await models.user.findByPk(id);
        if (!user) {
            throw new NotFoundError();
        }

        user.username = username || user.username;
        user.password = password || user.password;
        user.role = role || user.role;
        await user.save();

        return userFormatter(user);
    },

    async deleteUser(userId) {
        const user = await models.user.findByPk(userId);
        if (!user) {
            throw new NotFoundError();
        }

        await user.destroy();
    },
};

module.exports = userService;