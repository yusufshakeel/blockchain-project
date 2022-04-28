'use strict';

const { HTTP_HOST, HTTP_PORT, PROJECT_TITLE } = require('../constants');

const packageJson = require('../../package.json');

module.exports = {
  routePrefix: '/documentation',
  exposeRoute: true,
  addModels: true,
  swagger: {
    info: {
      title: `${PROJECT_TITLE}`,
      description: 'API Doc'
    },
    externalDocs: {
      url: packageJson.homepage,
      description: 'Find more info here'
    },
    host: `${HTTP_HOST}:${HTTP_PORT}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'Transactions' }],
    components: {
      securitySchemes: {
        BasicAuth: {
          type: 'http',
          scheme: 'basic'
        }
      }
    }
  }
};
