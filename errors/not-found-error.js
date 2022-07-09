class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Not Found');
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

module.exports = NotFoundError;
