class AuthenticationError extends Error {
  constructor(message) {
    super(message || 'Not authorized');
    this.name = 'AuthenticationError';
    this.status = 401;
  }
}

module.exports = AuthenticationError;
