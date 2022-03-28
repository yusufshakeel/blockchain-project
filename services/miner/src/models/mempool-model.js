'use strict';

const mongoose = require('mongoose');

const transactionSchema = require('./schemas/transaction-schema');

const MempoolSchema = new mongoose.Schema({
  transaction: {
    type: transactionSchema,
    required: true
  },
  status: {
    type: String,
    ['default']: 'PENDING'
  },
  timestamp: {
    type: Date,
    ['default']: Date.now,
    required: true
  }
});

const MempoolModel = mongoose.model('mempool', MempoolSchema);

module.exports = { MempoolModel };
