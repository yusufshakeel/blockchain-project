'use strict';

const CacheService = require('../../../src/services/cache-service');

describe('Testing CacheService', () => {
  const cache = CacheService();
  const key = 'TESTING_KEY';

  beforeEach(async () => {
    cache.unset(key);
    jest.clearAllMocks();
  });

  test('Should be able to set cache and get cache', async () => {
    const beforeCachingResponseFromCache = await cache.get(key);
    await cache.set(key, 'hello world');
    const afterCachineResponseFromCache = await cache.get(key);

    expect(beforeCachingResponseFromCache).toBeUndefined();
    expect(afterCachineResponseFromCache).toBe('hello world');
  });

  describe('Testing getOrCache', () => {
    describe('When data is not in the cache', () => {
      test('Should call source for data and cache', async () => {
        const source = jest.fn(() => '123');
        const response = await cache.getOrCache(key, source);
        expect(response).toBe('123');
        expect(source).toHaveBeenCalledTimes(1);
      });
    });

    describe('When data is in the cache', () => {
      test('Should not call source', async () => {
        await cache.set(key, 'abc');
        const source = jest.fn(() => '123');
        const response = await cache.getOrCache(key, source);
        expect(response).toBe('abc');
        expect(source).toHaveBeenCalledTimes(0);
      });
    });
  });
});
