const express = require('express');
const router = express.Router();

const isAuthorized = require('../../permissions/is-authorized');
const Permissions = require('../../permissions/permissions');
const Roles = require('../../permissions/roles');
const userService = require('../../services/user-service');
const asyncHandler = require('../async-handler');
const BadRequestError = require('../../errors/bad-request-error');
const validateDateRange = require('../utils/validate-date-range');

router.get(
  '/',
  isAuthorized(Permissions.Users.CRUD),
  asyncHandler(async (req, res) => {
    const { orderBy } = req.query;

    if (orderBy === 'workHours') {
      const { fromDate, toDate } = req.query;

      if (!fromDate || !toDate) {
        throw new BadRequestError('Missing required parameters');
      }

      if (!validateDateRange({ fromDate, toDate })) {
        throw new BadRequestError('Wrong date range');
      }

      res
        .status(200)
        .json(await userService.getUsersWithSchedules({ fromDate, toDate }));
    } else {
      res.status(200).json(await userService.getUsers());
    }
  })
);

router.post(
  '/',
  isAuthorized(Permissions.Users.CRUD),
  asyncHandler(async (req, res) => {
    const { username, password, role = Roles.Staff } = req.body;

    if (!username || !password) {
      throw new BadRequestError('Missing required parameters');
    }

    res
      .status(201)
      .json(await userService.createUser({ username, password, role }));
  })
);

router.put(
  '/:id',
  isAuthorized(Permissions.Users.CRUD),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;

    const user = await userService.updateUser({ id, username, password, role });
    res.status(200).json(user);
  })
);

router.delete(
  '/:id',
  isAuthorized(Permissions.Users.CRUD),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await userService.deleteUser(id);

    res.status(204).end();
  })
);

module.exports = router;
