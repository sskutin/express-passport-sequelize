const { Op } = require('sequelize');
const { models } = require('../sequelize');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const scheduleFormatter = (schedule) => {
  if (!schedule) {
    return null;
  }

  return {
    id: schedule.id,
    userId: schedule.userId,
    workDate: schedule.workDate,
    shiftLength: schedule.shiftLength,
  };
};

const scheduleService = {
  async createSchedule({ workDate, userId, shiftLength }) {
    const existing = await models.schedule.findOne({
      where: { workDate, userId },
    });

    if (existing) {
      throw new BadRequestError('Schedule for this date already exists');
    }
    const schedule = await models.schedule.create({
      workDate,
      userId,
      shiftLength,
    });
    return scheduleFormatter(schedule);
  },

  async getSchedules({ userId, fromDate, toDate }) {
    const user = await models.user.findByPk(userId, {
      include: {
        model: models.schedule,
        where: {
          workDate: {
            [Op.gte]: fromDate,
            [Op.lte]: toDate,
          },
        },
      },
    });

    if (!user) {
      return [];
    }

    return user.schedules.map(scheduleFormatter);
  },

  async updateSchedule({ id, workDate, shiftLength }) {
    const schedule = await models.schedule.findByPk(id);
    if (!schedule) {
      throw new NotFoundError();
    }

    schedule.workDate = workDate || schedule.workDate;
    schedule.shiftLength = shiftLength || schedule.shiftLength;
    await schedule.save();

    return scheduleFormatter(schedule);
  },

  async deleteSchedule(scheduleId) {
    const schedule = await models.schedule.findByPk(scheduleId);
    if (!schedule) {
      throw new NotFoundError();
    }

    await schedule.destroy();
  },
};

module.exports = scheduleService;
