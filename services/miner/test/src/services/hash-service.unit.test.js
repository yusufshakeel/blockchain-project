'use strict';

const HashService = require('../../../src/services/hash-service');

describe('Testing HashService', () => {
  describe('Testing getSHA256Hash', () => {
    test('Should be able to create hash', () => {
      expect(HashService().getSHA256Hash('hello')).toStrictEqual(
        '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
      );
    });
  });
});
