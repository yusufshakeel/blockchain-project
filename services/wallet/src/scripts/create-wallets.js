'use strict';

const fs = require('fs');
const path = require('path');
const Wallet = require('../wallet');

const wallet = new Wallet();

function createWallet(walletFor) {
  const { address, publicKey, privateKey } = wallet.createKeyPair();
  fs.writeFileSync(
    path.resolve(__dirname, `./../../output/${walletFor}.public.base64encode.txt`),
    publicKey
  );
  fs.writeFileSync(
    path.resolve(__dirname, `./../../output/${walletFor}.private.base64encode.txt`),
    privateKey
  );
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
