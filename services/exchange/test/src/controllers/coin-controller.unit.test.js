'use strict';

const CoinController = require('../../../src/controllers/coin-controller');
const CacheService = require('../../../src/services/cache-service');
const { CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS } = require('../../../src/constants');
const fakeBlockchain = require('../../test-data/fake-blockchains.json');

describe('Testing CoinController', () => {
  const cacheService = CacheService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing fetchFeeToBuyCoins', () => {
    beforeEach(async () => {
      cacheService.unset(CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS);
    });

    const services = {
      cacheService
    };

    const repositories = {
      blockchainRepository: {
        fetchLatestNBlocks: jest.fn(() => fakeBlockchain)
      }
    };

    const coinController = CoinController({ services, repositories });

    describe('When fee value is in the cache', () => {
      test('Should return from the cache', async () => {
        await cacheService.set(CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS, 1);
        const response = await coinController.fetchFeeToBuyCoins();
        expect(response).toStrictEqual({ data: { feeCoin: 1 } });
      });
    });

    describe('When fee value is not in the cache', () => {
      describe('When there are fees present in the blocks', () => {
        test('Should return computed fee coin using latest blocks in the blockchain', async () => {
          const valueFromCacheBeforeCall = await cacheService.get(
            CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS
          );
          const response = await coinController.fetchFeeToBuyCoins();
          const valueFromCacheAfterCall = await cacheService.get(
            CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS
          );

          expect(response).toStrictEqual({ data: { feeCoin: 0.0001 } });
          expect(valueFromCacheBeforeCall).toBeUndefined();
          expect(valueFromCacheAfterCall).toBe(0.0001);
        });
      });

      describe('When there are no fees present in the blocks', () => {
        test('Should return zero fee', async () => {
          const repositories = {
            blockchainRepository: {
              fetchLatestNBlocks: jest.fn(() => [])
            }
          };

          const coinController = CoinController({ services, repositories });

          const valueFromCacheBeforeCall = await cacheService.get(
            CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS
          );
          const response = await coinController.fetchFeeToBuyCoins();
          const valueFromCacheAfterCall = await cacheService.get(
            CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS
          );

          expect(response).toStrictEqual({ data: { feeCoin: 0 } });
          expect(valueFromCacheBeforeCall).toBeUndefined();
          expect(valueFromCacheAfterCall).toBe(0);
        });
      });
    });
  });
});
