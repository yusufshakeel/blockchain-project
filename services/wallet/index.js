'use strict';

const fastify = require('fastify')({ logger: true });
const Server = require('./src/server');
const Wallet = require('./src/wallet');

async function start() {
  try {
    const wallet = new Wallet();
    new Server({ fastify, wallet }).setup().then(server => server.run());
  } catch (err) {
    console.error('FATAL ERROR');
    console.error(err);
  }
}

start();
