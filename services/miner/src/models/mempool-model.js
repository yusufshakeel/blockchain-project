'use strict';

const mongoose = require('mongoose');

const transactionSchema = require('./schemas/transaction-schema');

const MempoolSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
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
  },
  updatedAt: {
    type: Date
  },
  minedAt: {
    type: Date
  }
});

const MempoolModel = mongoose.model('mempool', MempoolSchema);

module.exports = { MempoolModel };
