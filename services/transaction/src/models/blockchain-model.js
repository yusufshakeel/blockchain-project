'use strict';

const mongoose = require('mongoose');

const transactionSchema = require('./schemas/transaction-schema');

const BlockchainSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
    index: true,
    unique: true
  },
  nonce: {
    type: Number,
    required: true
  },
  previousHash: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  transactions: {
    type: [transactionSchema],
    required: true
  },
  timestamp: {
    type: Date,
    ['default']: Date.now,
    required: true
  }
});

const BlockchainModel = mongoose.model('blockchain', BlockchainSchema);

module.exports = { BlockchainModel };
