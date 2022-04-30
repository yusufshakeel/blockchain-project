import { Container, Row, Col, Button } from 'react-bootstrap';
import desktopAppImage from "../static/images/desktop-app.png"
import { Download } from "react-bootstrap-icons";

function HomePage() {
  return (
    <Container>
      <Row>
        <Col sm="12" md="6" style={{
            backgroundImage: `url(${desktopAppImage})`,
            backgroundRepeat: 'no-repeat',
            height: '400px'
        }}></Col>
        <Col sm="12" md="6" className="text-right">
          <h1>Welcome to CoinCoin Exchange.</h1>
          <p>Buy, Send, Receive coins with ease.</p>
          <Button variant="outline-primary" size="lg" className="my-5"><Download/> Download for macOS</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;