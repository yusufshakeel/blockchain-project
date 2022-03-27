'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

const errorHandler = error => {
  return {
    code: error.statusCode,
    errors: {
      errors: [
        {
          code: error.name,
          error: error.name,
          message: error.message,
          errorData: error?.errorData
        }
      ]
    }
  };
};

const defaultErrorHandler = error => {
  return {
    code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    errors: {
      errors: [
        {
          code: 'INTERNAL_SERVER_ERROR',
          error: 'INTERNAL_SERVER_ERROR',
          message: 'INTERNAL_SERVER_ERROR',
          errorData: error
        }
      ]
    }
  };
};

function ErrorBuilder() {
  this.build = function build(error) {
    const handlers = [
      { rule: error => error.statusCode && error.message, handler: error => errorHandler(error) },
      { rule: error => !!error, handler: error => defaultErrorHandler(error) }
    ];
    const matchingHandler = handlers.find(h => h.rule(error));
    return matchingHandler.handler(error);
  };
}

module.exports = ErrorBuilder;
