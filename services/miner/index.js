'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const CronJob = require('cron').CronJob;
const Services = require('./src/services');
const Repositories = require('./src/repositories');
const Controllers = require('./src/controllers');
const {
  MONGODB_DB_NAME,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  BLOCK_MINING_CRON_TIME
} = require('./src/constants');

const services = new Services();
const repositories = new Repositories();
const minerAddress = fs.readFileSync(
  path.resolve(__dirname, './seed/miner-root.address.txt'),
  'utf8'
);

const controllers = new Controllers({ repositories, services, minerAddress });

async function bootstrap() {
  try {
    const mongoOption = { dbName: MONGODB_DB_NAME };
    const mongoAuth =
      MONGODB_USERNAME.length && MONGODB_PASSWORD.length
        ? `${MONGODB_USERNAME}:${MONGODB_PASSWORD}@`
        : '';
    const mongoUrl = `mongodb://${mongoAuth}${MONGODB_HOST}:${MONGODB_PORT}`;
    await mongoose.connect(mongoUrl, mongoOption);
    return true;
  } catch (err) {
    console.error('FATAL ERROR');
    console.error(err);
    return false;
  }
}

async function run() {
  const isReady = await bootstrap();
  if (isReady) {
    await controllers.minerController.genesisTransaction();
    const job = new CronJob(BLOCK_MINING_CRON_TIME, () => controllers.minerController.mine());
    job.start();
  }
}

run();
