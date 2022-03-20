'use strict';

const crypto = require('crypto');

module.exports = function HashService() {
  const getSHA256Hash = function (data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  };

  return { getSHA256Hash };
};
