'use strict';

module.exports = function TransactionController({ repositories }) {
  const fetchAllPendingTransactions = async function memPool() {
    const transactions = await repositories.mempoolRepository.fetchAllPendingTransactions();
    return { data: { transactions: transactions.map(t => t.transaction) } };
  };

  const fetchLatestMinedTransactionsFromMempool =
    async function fetchLatestMinedTransactionsFromMempool() {
      const transactions = await repositories.mempoolRepository.fetchNLatestMinedTransactions(20);

      const summary = transactions.map(({ status, timestamp, transaction, minedAt }) => ({
        status,
        timestamp,
        transaction,
        minedAt
      }));

      return {
        data: {
          transactions: summary
        }
      };
    };

  return {
    fetchAllPendingTransactions,
    fetchLatestMinedTransactionsFromMempool
  };
};
