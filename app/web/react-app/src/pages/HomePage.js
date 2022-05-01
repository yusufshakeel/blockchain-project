import {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import desktopAppImage from "../static/images/desktop-app.png"
import { Download, Box } from "react-bootstrap-icons";

import ApiHandlers from '../api-handlers';
const apiHandler = new ApiHandlers();

function HomePage() {
  const [blockchainStatistics, setBlockchainStatistics] = useState({});

  const timestamp = () => new Date().toISOString();

  useEffect(() => {
    console.log(timestamp(), 'Entered HomePage useEffect');
    async function getStats()  {
      console.log(timestamp(), 'Entered HomePage getStats');
      const response = await apiHandler.exchangeApiHandler.getStatistics();
      if (response?.data?.statistics) {
        setBlockchainStatistics(response.data.statistics)
      }
    }
    const interval = setInterval(getStats, 5000);
    return () => clearInterval(interval);
  }, [])

  return (
    <Container>
      <Row>
        <Col sm="12" md="6" style={{
            backgroundImage: `url(${desktopAppImage})`,
            backgroundRepeat: 'no-repeat',
            height: '400px'
        }}></Col>
        <Col sm="12" md="6" className="text-right my-3">
          <h1>Welcome to CoinCoin Exchange.</h1>
          <p>Buy, Send, Receive coins with ease.</p>
          <Button variant="outline-primary" size="lg" className="my-5"><Download/> Download for macOS</Button>
        </Col>
      </Row>
      <Row>
        <Col className="my-5 text-center">
          <h1 className="display-1">Blocks mined <Box /></h1>
          <h2 className="display-3">{blockchainStatistics?.totalNumberOfBlocksMined ? blockchainStatistics.totalNumberOfBlocksMined : '---'}</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;