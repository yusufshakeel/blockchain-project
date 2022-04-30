import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand tag={Link} href="/">CoinCoin</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link  tag={Link} href="/">Home</Nav.Link>
          <Nav.Link  tag={Link} href="/blocks">Blocks</Nav.Link>
          <Nav.Link  tag={Link} href="/transactions">Transactions</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar;