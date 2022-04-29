'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class InvalidTransactionRequestError extends DomainError {
  constructor({ errorData }) {
    super({
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: 'Invalid transaction request',
      errorData
    });
    this.name = 'BLOCKCHAIN_DOMAIN_INVALID_TRANSACTION_REQUEST_ERROR';
  }
}

module.exports = InvalidTransactionRequestError;
