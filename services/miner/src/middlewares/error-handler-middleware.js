'use strict';

const ErrorBuilder = require('../builders/error-builder');

function ErrorHandlerMiddleware() {
  const errorBuilder = new ErrorBuilder();

  return (error, request, reply) => {
    const url = new URL(request.raw.url, `${request.protocol}://${request.hostname}`).href;
    const method = request.raw.method;
    console.error(`FASTIFY_ERROR_HANDLER for ${method} ${url}`, error, {
      url,
      query: request.query,
      body: request.body,
      method
    });
    const enrichedError = errorBuilder.build(error);
    reply.code(enrichedError.code).send(enrichedError.errors);
  };
}

module.exports = ErrorHandlerMiddleware;
