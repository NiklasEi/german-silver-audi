class ValidationError extends Error {
  constructor(message, ...args) {
    super(message, ...args);
  }
}

module.exports = ValidationError