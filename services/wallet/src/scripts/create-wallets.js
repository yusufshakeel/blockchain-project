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
  createWallet('user-alice');
  createWallet('user-bob');
  createWallet('user-eve');
  createWallet('user-tony');
  createWallet('user-peter');
  createWallet('miner-john');
  createWallet('miner-jane');
  createWallet('miner-jimmy');
  createWallet('miner-root');
}

run();
