'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class NetworkError extends DomainError {
  constructor({ message, errorData, innerError }) {
    super({
      statusCode: HTTP_STATUS_CODES.BAD_GATEWAY,
      message,
      errorData,
      innerError
    });
    this.name = 'BLOCKCHAIN_DOMAIN_NETWORK_ERROR';
  }
}

module.exports = NetworkError;
