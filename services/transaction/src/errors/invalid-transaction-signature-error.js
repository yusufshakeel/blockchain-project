'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class InvalidTransactionSignatureError extends DomainError {
  constructor() {
    super({
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: 'Invalid transaction signature'
    });
    this.name = 'BLOCKCHAIN_DOMAIN_INVALID_TRANSACTION_SIGNATURE_ERROR';
  }
}

module.exports = InvalidTransactionSignatureError;
