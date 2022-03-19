# Blockchain

## Table of Content

* [Coin](#coin)
* [Structure of the block](#structure-of-the-block)
* [Proof of Work](#proof-of-work)
* [Hash of the block](#hash-of-the-block)
* [Structure of the transaction](#hash-of-the-block)

### Coin

When a block is mined by miner **128** coins is issued.

Every **1024** (2^10) blocks the number of coins issued will be halved.

### Structure of the block

The structure of a block in this project.

```json
{
  "index": "integer",
  "nonce": "integer",
  "timestamp": "string-utc-timestamp",
  "previousHash": "string-sha256",
  "hash": "string-sha256",
  "transactions": []
}
```

A block can have max **16** transactions and min **1** transaction. 
And transactions should not be more than **16KB**.

On mining a block the miner is awarded crypto coins.

### Proof of Work

The `nonce` value calculated is the proof of work for this project.

### Hash of the block

To calculate the hash we will perform the following calculation.

```text
Hash = SHA256 of data

where, data is the following

data = index + nonce + timestamp + previousHash + transactions

All the values used above are stringified.
```

In order for a hash to be accepted it must have **4** leading zeros for this project.

### Structure of the transaction

The transaction will look like the following.

```json
{
  "uuid": "string",
  "sender": "string",
  "receiver": "string",
  "transactionValue": "number",
  "feeValue": "number",
  "rewardValue": "number",
  "message": "string",
  "timestamp": "string-utc-timestamp"
}
```