'use strict';

const SchemaRepository = require('./schema-repository');

module.exports = function Repositories({ parser }) {
  this.schemaRepository = new SchemaRepository({ parser });
};
