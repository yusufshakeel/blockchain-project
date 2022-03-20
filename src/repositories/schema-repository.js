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

    const genericIdResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'generic-id-response.json')
    );

    const createTransactionRequest = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'create-transaction-request.json')
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

    const v1Schemas = {
      blockchain: {
        block: {
          request: {
            params: blockRequestParams
          },
          response: blockResponse
        },
        emptyObject: emptyObject,
        requestHeader: requestHeader,
        createTransaction: {
          request: createTransactionRequest,
          response: genericIdResponse
        },
        mempoolTransactions: {
          response: mempoolTransactionsResponse
        }
      }
    };

    self.schemas = {
      v1: v1Schemas
    };

    return self.schemas;
  };
};
