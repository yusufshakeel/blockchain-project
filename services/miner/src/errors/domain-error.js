'use strict';

class DomainError extends Error {
  constructor({ statusCode, message, innerError, errorData }) {
    super(message);
    this.statusCode = statusCode;
    this.innerError = innerError;
    this.errorData = errorData;
  }
}

module.exports = DomainError;
