# blockchain-project
This is a simple blockchain project.

## Table of Content

* [Getting started](#getting-started)
* [Services](#services)
  * [Miner](#miner)
  * [Wallet](#wallet)

## Getting started

### Install packages

Go inside the `services` folders and run the following command to install the packages.

```shell
npm i
```

## Services

### Miner

This is the miner service.

#### Tests

To run the tests run the following in the terminal.

```shell
npm run test
```

#### Start local server

Run the following in the terminal.

```shell
npm run start
```

#### Swagger doc

```text
http://localhost:10101/documentation/static/index.html
```

### Wallet

This will help create wallet.

#### Bootstrap

This will create folder like `output` and wallets.

```shell
npm run bootstrap
```

#### Tests

To run the tests run the following in the terminal.

```shell
npm run test
```

#### Start local server

Run the following in the terminal.

```shell
npm run start
```

#### Swagger doc

```text
http://localhost:10102/documentation/static/index.html
```