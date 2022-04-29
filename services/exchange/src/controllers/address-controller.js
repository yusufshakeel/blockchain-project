'use strict';

const { getAddressBalance } = require('../helpers');

module.exports = function AddressController({ repositories }) {
  const fetchCoinBalance = async function ({ address }) {
    const blockchain = await repositories.blockchainRepository.fetchAllBlocks();
    const { totalCoinsSent, totalCoinsReceived, coinBalance } = getAddressBalance({
      address,
      blockchain
    });
    return { data: { totalCoinsSent, totalCoinsReceived, coinBalance } };
  };

  return { fetchCoinBalance };
};
