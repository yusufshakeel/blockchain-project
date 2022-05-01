import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import { Box, Circle, Hdd } from "react-bootstrap-icons";

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
  const [latestStatistics, setLatestStatistics] = useState({});

  const timestamp = () => new Date().toISOString();

  useEffect(() => {
    console.log(timestamp(), "Entered ExplorerPage useEffect");

    async function getExchangeData() {
      console.log(timestamp(), "Entered ExplorerPage getExchangeData");
      const [responseLatestMinedBlocks,
        responsePendingTransactionsFromMempool,
        responseLatestMinedTransactionFromMempool,
        responseStatistics
      ] = await Promise.all([
        apiHandler.exchangeApiHandler.getLatestMinedBlocksSummary(),
        apiHandler.exchangeApiHandler.getPendingTransactionsFromMempool(),
        apiHandler.exchangeApiHandler.getLatestMinedTransactionsFromMempool(),
        apiHandler.exchangeApiHandler.getStatistics()
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
      if (responseStatistics?.data?.statistics) {
        setLatestStatistics(responseStatistics.data.statistics);
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
      <Row className="my-3">
        <Col sm="12" md="4">
          <Card>
            <Card.Body>
              <h4><Box/> Blocks Mined: {latestStatistics.totalNumberOfBlocksMined}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="12" md="4">
          <Card>
            <Card.Body>
              <h4><Hdd/> Blockchain size: {Number(latestStatistics.sizeOfBlockchainInBytes/Math.pow(1024,2)).toLocaleString()} MB</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="12" md="4">
          <Card>
            <Card.Body>
              <h4><Circle/> Mempool: {latestPendingTransactions.length.toLocaleString()}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <MinedBlockCoinsChart blocks={latestBlocks}/>
        </Col>
        <Col>
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