const AuthenticationError = require('../errors/authentication-error');

const isAuthorized = require('./is-authorized');
const Permissions = require('./permissions');
const Roles = require('./roles');

const res = {};
const next = jest.fn(() => {});

describe('isAuthorized', () => {
  it('should throw exception for non authorised', () => {
    const req = {
      isAuthenticated: () => false,
    };

    expect(() => {
      isAuthorized(Permissions.Users.CRUD)(req, res, next);
    }).toThrow(AuthenticationError);
  });

  it('should throw exception for authorised with insufficient access', () => {
    const req = {
      isAuthenticated: () => true,
      user: {
        role: Roles.Staff,
      },
    };

    expect(() => {
      isAuthorized(Permissions.Users.CRUD)(req, res, next);
    }).toThrow(AuthenticationError);
  });

  it('should call next for authorised', () => {
    const req = {
      isAuthenticated: () => true,
      user: {
        role: Roles.Admin,
      },
    };

    isAuthorized(Permissions.Users.CRUD)(req, res, next);
    expect(next).toBeCalled();
  });
});
