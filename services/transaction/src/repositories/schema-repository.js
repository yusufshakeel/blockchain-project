'use strict';

const path = require('path');
const { SCHEMA_LOCATION_V1 } = require('../constants/schema-constants');

module.exports = function SchemaRepository({ parser }) {
  const self = this;
  this.schemas = {};

  this.loadAll = async function () {
    const requestHeader = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'request-headers.json')
    );

    const genericIdResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'generic-id-response.json')
    );

    const createTransactionRequest = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'create-transaction-request.json')
    );

    const v1Schemas = {
      blockchain: {
        requestHeader: requestHeader,
        createTransaction: {
          request: createTransactionRequest,
          response: genericIdResponse
        }
      }
    };

    self.schemas = {
      v1: v1Schemas
    };

    return self.schemas;
  };
};
