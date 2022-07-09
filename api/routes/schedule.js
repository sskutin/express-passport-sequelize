const express = require('express');
const router = express.Router();

const isAuthorized = require('../../permissions/is-authorized');
const Permissions = require('../../permissions/permissions');
const scheduleService = require('../../services/schedule-service');
const asyncHandler = require("../async-handler");
const BadRequestError = require('../../errors/bad-request-error');
const validateDateRange = require("../utils/validate-date-range");

router.get('/', isAuthorized(Permissions.Schedule.Read), asyncHandler(async (req, res, next) => {
    const userId = req.query.userId || req.user.id;
    const { fromDate, toDate } = req.query;

    if (!fromDate || !toDate) {
        throw new BadRequestError("Missing required parameters");
    }

    if (!validateDateRange({ fromDate, toDate })) {
        throw new BadRequestError("Wrong date range");
    }

    res.status(200).json(await scheduleService.getSchedules({ userId, fromDate, toDate }));
}));

router.post('/', isAuthorized(Permissions.Schedule.CRUD), asyncHandler(async (req, res, next) => {
    const { workDate, userId, shiftLength } = req.body;

    if (!workDate || !userId || !shiftLength) {
        throw new BadRequestError("Missing required parameters");
    }

    res.status(201).json(await scheduleService.createSchedule({ workDate, userId, shiftLength }));
}));

router.put('/:id', isAuthorized(Permissions.Schedule.CRUD), asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { workDate, shiftLength } = req.body;

    const schedule = await scheduleService.updateSchedule({ id, workDate, shiftLength });
    res.status(200).json(schedule);
}));

router.delete('/:id', isAuthorized(Permissions.Schedule.CRUD), asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    await scheduleService.deleteSchedule(id);
    res.status(204).end();
}));

module.exports = router;