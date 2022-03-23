'use strict';

const fs = require('fs');
const path = require('path');
const Wallet = require('../wallet');

const wallet = new Wallet();

function createWallet(walletFor) {
  const { publicKey, privateKey } = wallet.createKeyPair();
  const address = wallet.createAddress({ publicKey });
  fs.writeFileSync(path.resolve(__dirname, `./../../output/${walletFor}.public.pem`), publicKey);
  fs.writeFileSync(path.resolve(__dirname, `./../../output/${walletFor}.private.pem`), privateKey);
  fs.writeFileSync(path.resolve(__dirname, `./../../output/${walletFor}.address.txt`), address);
}

function run() {
  createWallet('alice');
  createWallet('bob');
  createWallet('miner');
}

run();
