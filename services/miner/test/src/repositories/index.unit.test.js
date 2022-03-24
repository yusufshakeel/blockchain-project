'use strict';

const JsonSchemaRefParser = require('json-schema-ref-parser');
const Repositories = require('../../../src/repositories');

const repositories = new Repositories({ parser: new JsonSchemaRefParser() });

describe('Repositories', () => {
  test('Should have the needed repositories', () => {
    expect(repositories.schemaRepository).not.toBeUndefined();
  });
});
