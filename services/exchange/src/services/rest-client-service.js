'use strict';

const NetworkError = require('../errors/network-error');

module.exports = function RestClientService({ client, uuidService }) {
  const post = async function ({ data, url }) {
    try {
      const response = await client({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'x-service-id': 'BLOCKCHAIN_EXCHANGE_SERVICE',
          'x-trace-id': uuidService.uuidV4()
        },
        url,
        data
      });
      return response.data;
    } catch (e) {
      throw new NetworkError({ message: e.message, errorData: e });
    }
  };

  return { post };
};
