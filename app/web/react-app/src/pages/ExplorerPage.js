import { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

import MinedBlockCoinsChart from "../components/charts/MinedBlockCoinsChart";
import MinedBlockTransactionsChart from "../components/charts/MinedBlockTransactionsChart";
import MinedBlockRow from "../components/MinedBlockRow";
import MempoolTransactionRow from "../components/MempoolTransactionRow";
import MinedTransactionRow from "../components/MinedTransactionRow";

import ApiHandlers from "../api-handlers";

const apiHandler = new ApiHandlers();

function ExplorerPage() {
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [latestPendingTransactions, setLatestPendingTransactions] = useState([]);
  const [latestMinedTransactions, setLatestMinedTransactions] = useState([]);

  const timestamp = () => new Date().toISOString();

  useEffect(() => {
    console.log(timestamp(), "Entered ExplorerPage useEffect");

    async function getExchangeData() {
      console.log(timestamp(), "Entered ExplorerPage getExchangeData");
      const [responseLatestMinedBlocks,
        responsePendingTransactionsFromMempool,
        responseLatestMinedTransactionFromMempool
      ] = await Promise.all([
        apiHandler.exchangeApiHandler.getLatestMinedBlocksSummary(),
        apiHandler.exchangeApiHandler.getPendingTransactionsFromMempool(),
        apiHandler.exchangeApiHandler.getLatestMinedTransactionsFromMempool()
      ]);
      console.log({ responseLatestMinedBlocks, responsePendingTransactionsFromMempool, responseLatestMinedTransactionFromMempool });
      if (responseLatestMinedBlocks?.data?.blocks) {
        setLatestBlocks(responseLatestMinedBlocks.data.blocks);
      }
      if (responsePendingTransactionsFromMempool?.data?.transactions) {
        setLatestPendingTransactions(responsePendingTransactionsFromMempool.data.transactions);
      }
      if (responseLatestMinedTransactionFromMempool?.data?.transactions) {
        setLatestMinedTransactions(responseLatestMinedTransactionFromMempool.data.transactions);
      }
    }

    const interval = setInterval(getExchangeData, 5000);
    return () => clearInterval(interval);
  });

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center mt-2 my-5">Explorer</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Coins/Block</h4>
          <MinedBlockCoinsChart blocks={latestBlocks}/>
        </Col>
        <Col>
          <h4>Transactions/Block</h4>
          <MinedBlockTransactionsChart blocks={latestBlocks}/>
        </Col>
      </Row>
      <Row>
        <Col className="my-4">
          <h3>Latest blocks</h3>
          <Table responsive>
            <thead>
            <tr>
              <th>Block Index</th>
              <th>Mined At</th>
              <th>Coins</th>
              <th>Number of Transactions</th>
            </tr>
            </thead>
            <tbody>
            {latestBlocks.map((block, index) => <MinedBlockRow key={index} block={block} />)}
            </tbody>
          </Table>
        </Col>
        <Col className="my-4">
          <h3>Mempool</h3>
          <Table responsive>
            <thead>
            <tr>
              <th>Created At</th>
              <th>Summary</th>
            </tr>
            </thead>
            <tbody>
            {latestPendingTransactions.map((block, index) => <MempoolTransactionRow key={index}
                                                                                    transaction={block} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="my-4">
          <h3>Mined transactions</h3>
          <Table responsive>
            <thead>
            <tr>
              <th>Mined At</th>
              <th>Details</th>
            </tr>
            </thead>
            <tbody>
            {latestMinedTransactions.map((block, index) => <MinedTransactionRow key={index}
                                                                                  transaction={block} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default ExplorerPage;