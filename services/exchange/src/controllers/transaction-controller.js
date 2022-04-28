'use strict';

module.exports = function TransactionController({ repositories }) {
  const memPool = async function memPool() {
    const transactions = await repositories.mempoolRepository.fetchAllPendingTransactions();
    return { data: { transactions: transactions.map(t => t.transaction) } };
  };

  return {
    memPool
  };
};
