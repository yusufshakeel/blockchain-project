'use strict';

const swaggerPlugin = require('fastify-swagger');
const JsonSchemaRefParser = require('json-schema-ref-parser');
const areciboPlugin = require('arecibo');
const swaggerConfig = require('./configs/swagger-config');
const areciboConfig = require('./configs/arecibo-config');
const { HTTP_PORT, HTTP_HOST } = require('./constants');
const ErrorHandlerMiddleware = require('./middlewares/error-handler-middleware');
const RoutesV1 = require('./routes/v1');
const Repositories = require('./repositories');
const Controllers = require('./controllers');

module.exports = function Server({ fastify, wallet }) {
  const self = this;

  this.setup = async () => {
    const controllers = new Controllers({ wallet });
    const repositories = new Repositories({ parser: new JsonSchemaRefParser() });

    const schemaRepository = await repositories.schemaRepository.loadAll();
    fastify.setErrorHandler(new ErrorHandlerMiddleware());
    fastify.register(swaggerPlugin, swaggerConfig);
    fastify.register(areciboPlugin, areciboConfig);

    fastify.register(RoutesV1, { controllers, schemaRepository });
    return self;
  };

  this.run = async () => {
    await fastify.listen(HTTP_PORT, HTTP_HOST, function (err) {
      if (err) throw err;
      fastify.swagger();
    });
  };
};
