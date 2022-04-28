'use strict';

const TimeService = require('../../../src/services/time-service');

describe('Testing TimeService', () => {
  test('Should return time in ISOString', () => {
    expect(TimeService().now()).toMatch(
      /^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}.[\d]{3}Z$/
    );
  });
});
