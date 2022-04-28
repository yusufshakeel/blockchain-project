'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = function UUIDService() {
  const uuidV4 = () => {
    return uuidv4();
  };

  return { uuidV4 };
};
