class ValidationError extends Error {
  constructor(message, ...args) {
    super(message, ...args);
    this.name = 'ValidationError';
    this.httpCode = 400;
  }
}

module.exports = ValidationError