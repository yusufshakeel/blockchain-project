'use strict';

const MinerController = require('./miner-controller');

module.exports = function Controller({ repositories, services, minerAddress }) {
  this.minerController = MinerController({ repositories, services, minerAddress });
};
