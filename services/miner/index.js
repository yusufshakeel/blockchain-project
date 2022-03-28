'use strict';

const mongoose = require('mongoose');
const fastify = require('fastify')({ logger: true });
const Server = require('./src/server');
const Services = require('./src/services');
const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DB_NAME
} = require('./src/constants');

async function start() {
  try {
    const mongoOption = { dbName: MONGODB_DB_NAME };
    const mongoAuth =
      MONGODB_USERNAME.length && MONGODB_PASSWORD.length
        ? `${MONGODB_USERNAME}:${MONGODB_PASSWORD}@`
        : '';
    const mongoUrl = `mongodb://${mongoAuth}${MONGODB_HOST}:${MONGODB_PORT}`;
    await mongoose.connect(mongoUrl, mongoOption);
    console.info('Connected to MongoDB database.');

    const services = new Services();
    new Server({ fastify, services }).setup().then(server => server.run());
  } catch (err) {
    console.error('FATAL ERROR');
    console.error(err);
  }
}

start();
