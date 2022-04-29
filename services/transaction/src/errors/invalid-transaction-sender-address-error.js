'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class InvalidTransactionSenderAddressError extends DomainError {
  constructor() {
    super({
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: 'Invalid transaction sender address'
    });
    this.name = 'BLOCKCHAIN_DOMAIN_INVALID_TRANSACTION_SENDER_ADDRESS_ERROR';
  }
}

module.exports = InvalidTransactionSenderAddressError;
