const express = require('express');
const router = express.Router();

const Roles = require('../../permissions/roles');
const userService = require('../../services/user-service');
const asyncHandler = require("../async-handler");
const BadRequestError = require('../../errors/bad-request-error');

router.post('/', asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError("Missing required parameters");
    }

    const user = await userService.createUser({ username, password, role: Roles.Staff });

    req.login(user, () => {
        res.status(201).json(user);
    });
}));

module.exports = router;