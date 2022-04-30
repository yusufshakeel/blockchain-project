'use strict';

const NodeCache = require('node-cache');
const { TTL_FOR_CACHE_IN_SECONDS } = require('../constants');

module.exports = function CacheService() {
  const nodeCache = new NodeCache({
    stdTTL: TTL_FOR_CACHE_IN_SECONDS,
    checkperiod: 120,
    useClones: false
  });

  async function set(key, value, ttl = TTL_FOR_CACHE_IN_SECONDS) {
    nodeCache.set(key, value, ttl);
  }

  async function unset(key) {
    nodeCache.del(key);
  }

  async function get(key) {
    return nodeCache.get(key);
  }

  async function getOrCache(key, source, ttl = TTL_FOR_CACHE_IN_SECONDS) {
    const value = await get(key);
    if (!value) {
      const retrievedValue = await source();
      await set(key, retrievedValue, ttl);
      return retrievedValue;
    }
    return value;
  }

  return { set, get, unset, getOrCache };
};
