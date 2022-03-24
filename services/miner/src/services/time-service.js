'use strict';

module.exports = function TimeService() {
  const now = () => {
    return new Date().toISOString();
  };

  return { now };
};
