const Roles = require('./roles');
const Permissions = require('./permissions');

const permissionsMap = {
  [Roles.Admin]: [
    Permissions.Users.CRUD,
    Permissions.Schedule.CRUD,
    Permissions.Schedule.Read,
  ],
  [Roles.Staff]: [Permissions.Schedule.Read],
  [undefined]: [],
};

module.exports = permissionsMap;
