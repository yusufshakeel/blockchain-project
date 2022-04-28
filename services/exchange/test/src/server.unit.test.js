'use strict';

const fastifyModule = require('fastify');
const Server = require('../../src/server');
const Services = require('../../src/services');

describe('Server', () => {
  const services = new Services();

  describe('Setup', () => {
    test('Should be able to setup server', async () => {
      const fastify = fastifyModule();
      await expect(new Server({ fastify, services }).setup()).resolves.not.toThrow();
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
        const server = await new Server({ fastify, services }).setup();
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
          const server = await new Server({ fastify, services }).setup();
          await server.run();
        } catch (e) {
          expect(e).toBe('someError');
        }
        expect(fastify.listen).toHaveBeenCalledTimes(1);
      });
    });
  });
});
