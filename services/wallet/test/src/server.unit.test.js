'use strict';

const fastifyModule = require('fastify');
const Server = require('../../src/server');
const Wallet = require('../../src/wallet');

describe('Server', () => {
  describe('Setup', () => {
    test('Should be able to setup server', async () => {
      const fastify = fastifyModule();
      const wallet = new Wallet();
      await expect(new Server({ fastify, wallet }).setup()).resolves.not.toThrow();
      await fastify.close();
    });
  });

  describe('Run', () => {
    describe('When there is no error', () => {
      test('Should be able to run server', async () => {
        const fastify = {
          register: jest.fn(),
          swagger: jest.fn(),
          addHook: jest.fn(),
          setErrorHandler: jest.fn(),
          listen: jest.fn((port, host, cb) => cb())
        };
        const wallet = new Wallet();
        const server = await new Server({ fastify, wallet }).setup();
        await server.run();
        expect(fastify.listen).toHaveBeenCalledTimes(1);
      });
    });

    describe('When there is error', () => {
      test('Should throw error', async () => {
        const fastify = {
          register: jest.fn(),
          swagger: jest.fn(),
          addHook: jest.fn(),
          setErrorHandler: jest.fn(),
          listen: jest.fn((port, host, cb) => cb('someError'))
        };
        try {
          const wallet = new Wallet();
          const server = await new Server({ fastify, wallet }).setup();
          await server.run();
        } catch (e) {
          expect(e).toBe('someError');
        }
        expect(fastify.listen).toHaveBeenCalledTimes(1);
      });
    });
  });
});
