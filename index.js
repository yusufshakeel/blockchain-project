'use strict';

const fastify = require('fastify')({ logger: true });
const Server = require('./src/server');
const Blockchain = require('./src/blockchain');
const Wallet = require('./src/wallet');
const Services = require('./src/services');
const { BLOCKCHAIN_ROOT_MINER_ADDRESS } = require('./src/constants');

async function start() {
  try {
    const minerAddress = process.env.BLOCKCHAIN_ROOT_MINER_ADDRESS ?? BLOCKCHAIN_ROOT_MINER_ADDRESS;
    const services = new Services();
    const blockchain = new Blockchain({ minerAddress, services });
    const wallet = new Wallet();
    new Server({ fastify, blockchain, wallet, services }).setup().then(server => server.run());
  } catch (err) {
    console.error('FATAL ERROR');
    console.error(err);
  }
}

start();
