'use strict';

const UUIDService = require('../../../src/services/uuid-service');

describe('Testing UUIDService', () => {
  test('Should uuid v4', () => {
    expect(UUIDService().uuidV4()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });
});
