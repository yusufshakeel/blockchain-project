'use strict';

const path = require('path');
const { SCHEMA_LOCATION_V1 } = require('../constants/schema-constants');

module.exports = function SchemaRepository({ parser }) {
  const self = this;
  this.schemas = {};

  this.loadAll = async function () {
    const emptyObject = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'empty-object.json')
    );

    const requestHeader = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'request-headers.json')
    );

    const mempoolTransactionsResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'mempool-response.json')
    );

    const blockRequestParams = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'block-request-params.json')
    );

    const blockResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'block-response.json')
    );

    const statisticsResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'block-statistics-response.json')
    );

    const addressCoinBalanceRequestParams = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'address-coin-balance-request-params.json')
    );

    const addressCoinBalanceResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'address-coin-balance-response.json')
    );

    const buyCoinRequestBody = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'buy-coin-request-body.json')
    );

    const buyCoinResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'buy-coin-response.json')
    );

    const buyCoinFeeResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'buy-coin-fee-response.json')
    );

    const minedBlocksSummaryResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'mined-block-summary-response.json')
    );

    const minedTransactionsFromMempoolSummaryResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'mined-transaction-from-mempool-summary-response.json')
    );

    const v1Schemas = {
      blockchain: {
        block: {
          request: {
            params: blockRequestParams
          },
          response: blockResponse,
          statistics: {
            response: statisticsResponse
          },
          mined: {
            summary: {
              response: minedBlocksSummaryResponse
            }
          }
        },
        emptyObject: emptyObject,
        requestHeader: requestHeader,
        mempoolTransactions: {
          response: mempoolTransactionsResponse,
          mined: {
            summary: {
              response: minedTransactionsFromMempoolSummaryResponse
            }
          }
        },
        addressCoinBalance: {
          request: {
            headers: requestHeader,
            params: addressCoinBalanceRequestParams
          },
          response: addressCoinBalanceResponse
        },
        coin: {
          buy: {
            request: {
              headers: requestHeader,
              body: buyCoinRequestBody
            },
            response: buyCoinResponse
          },
          buyFee: {
            response: buyCoinFeeResponse
          }
        }
      }
    };

    self.schemas = {
      v1: v1Schemas
    };

    return self.schemas;
  };
};
