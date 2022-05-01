import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Container>
      <Row className="p-5 mt-3">
        <Col className="text-center">
          <h6><a href="https://github.com/yusufshakeel/blockchain-project">Project Code</a></h6>
        </Col>
      </Row>
    </Container>
  )
}

export default NavigationBar;