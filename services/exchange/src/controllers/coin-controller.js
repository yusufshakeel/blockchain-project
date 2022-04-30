'use strict';

const {
  LATEST_NUMBER_OF_BLOCKS_FOR_FINDING_FEE_TO_BUY_COINS,
  TRANSACTION_TYPE_FEE_COIN,
  NUMBER_OF_DECIMAL_PLACES,
  CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS,
  EXCHANGE_MINER_ROOT_WALLET,
  HTTP_TRANSACTION_SERVICE_DOMAIN_ADDRESS
} = require('../constants');

module.exports = function CoinController({ services, repositories }) {
  const buyCoins = async function ({ address, coinsToBuy }) {
    const {
      data: { feeCoin: averageFeeCoins }
    } = await fetchFeeToBuyCoins();

    const coinsToBuyAfterFee = Number(
      (coinsToBuy - averageFeeCoins).toFixed(NUMBER_OF_DECIMAL_PLACES)
    );

    const transaction = {
      sender: EXCHANGE_MINER_ROOT_WALLET.address,
      receiver: address,
      transactionValue: coinsToBuyAfterFee,
      feeValue: averageFeeCoins,
      message: 'Buying coin from exchange'
    };

    const validation = {
      signature: services.transactionSignatureService.getSignature(transaction),
      publicKey: EXCHANGE_MINER_ROOT_WALLET.publicKey
    };

    const requestBody = {
      data: {
        transaction,
        validation
      }
    };

    const response = await services.restClientService.post({
      data: requestBody,
      url: `${HTTP_TRANSACTION_SERVICE_DOMAIN_ADDRESS}/v1/transactions`
    });

    return {
      data: {
        transactionUUID: response.data.uuid,
        message: 'Purchased coins will show in your balance in few minutes.',
        purchaseSummary: { coinsPurchased: coinsToBuyAfterFee, feeCoins: averageFeeCoins }
      }
    };
  };

  async function findAverageFee() {
    const lastestNBlocks = await repositories.blockchainRepository.fetchLatestNBlocks(
      LATEST_NUMBER_OF_BLOCKS_FOR_FINDING_FEE_TO_BUY_COINS
    );

    const feeTransactions = lastestNBlocks.reduce((result, block) => {
      const { transactions } = block;
      return [
        ...result,
        ...transactions.filter(v => v.transactionType === TRANSACTION_TYPE_FEE_COIN)
      ];
    }, []);

    if (!feeTransactions.length) {
      return 0;
    }

    const sumOfFeeValue = feeTransactions.reduce((result, transaction) => {
      const { feeValue } = transaction;
      return Number((feeValue + result).toFixed(NUMBER_OF_DECIMAL_PLACES));
    }, 0);

    return Number((sumOfFeeValue / feeTransactions.length).toFixed(NUMBER_OF_DECIMAL_PLACES));
  }

  const fetchFeeToBuyCoins = async function () {
    const averageFeeValue = await services.cacheService.getOrCache(
      CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS,
      findAverageFee
    );
    return { data: { feeCoin: averageFeeValue } };
  };

  return { buyCoins, fetchFeeToBuyCoins };
};
