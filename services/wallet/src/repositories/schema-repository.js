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

    const createKeyPairResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'create-key-pair-response.json')
    );

    const createAddressRequest = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'create-address-request.json')
    );

    const createAddressResponse = await parser.dereference(
      path.join(SCHEMA_LOCATION_V1, 'create-address-response.json')
    );

    const v1Schemas = {
      blockchain: {
        emptyObject: emptyObject,
        wallet: {
          createKeyPair: {
            response: createKeyPairResponse
          },
          createAddress: {
            request: createAddressRequest,
            response: createAddressResponse
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
