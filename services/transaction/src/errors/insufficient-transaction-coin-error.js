'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class InsufficientTransactionCoinError extends DomainError {
  constructor({ coinBalance, coinToTransfer, coinShortage }) {
    super({
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: 'Insufficient transaction coins',
      errorData: { coinBalance, coinToTransfer, coinShortage }
    });
    this.name = 'BLOCKCHAIN_DOMAIN_INSUFFICIENT_TRANSACTION_COINS_ERROR';
  }
}

module.exports = InsufficientTransactionCoinError;
