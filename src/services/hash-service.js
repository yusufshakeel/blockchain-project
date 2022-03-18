'use strict';

const SHA256 = require('crypto-js/sha256');

module.exports = function HashService() {
  const getSHA256Hash = function (data) {
    return SHA256(data).toString();
  };

  return { getSHA256Hash };
};
