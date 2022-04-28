'use strict';

const TimeService = require('./time-service');
const UUIDService = require('./uuid-service');

module.exports = function Services() {
  this.timeService = TimeService();
  this.uuidService = UUIDService();
};
