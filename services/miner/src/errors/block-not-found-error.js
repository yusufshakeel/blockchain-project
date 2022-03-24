'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');
const DomainError = require('./domain-error');

class BlockNotFoundError extends DomainError {
  constructor(blockId) {
    super({
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Block not found',
      errorData: { blockId }
    });
    this.name = 'BLOCKCHAIN_DOMAIN_BLOCK_NOT_FOUND_ERROR';
  }
}

module.exports = BlockNotFoundError;
