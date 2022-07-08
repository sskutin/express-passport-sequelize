const AuthenticationError = require('../errors/authentication-error');
const permissionsMap = require('../permissions/permissions-map');

const isAuthorized = (permission) => (req, res, next) => {
    if (req.isAuthenticated()) {
        if (permissionsMap[req.user.role].indexOf(permission) !== -1) {
            next();
        } else {
            throw new AuthenticationError("Access denied");
        }
    } else {
        throw new AuthenticationError();
    }
}

module.exports = isAuthorized;