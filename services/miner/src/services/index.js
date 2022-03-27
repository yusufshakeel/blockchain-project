'use strict';

const TimeService = require('./time-service');
const HashService = require('./hash-service');
const UUIDService = require('./uuid-service');

module.exports = function Services() {
  this.timeService = TimeService();
  this.hashService = HashService();
  this.uuidService = UUIDService();
};
