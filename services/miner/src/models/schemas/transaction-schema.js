'use strict';

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  transactionValue: {
    type: Number,
    required: true
  },
  feeValue: {
    type: Number,
    required: true,
    ['default']: 0
  },
  rewardValue: {
    type: Number,
    required: true,
    ['default']: 0
  },
  message: {
    type: String,
    maxlength: 160,
    minlength: 1
  },
  timestamp: {
    type: Date,
    ['default']: Date.now,
    required: true
  }
});

module.exports = transactionSchema;
