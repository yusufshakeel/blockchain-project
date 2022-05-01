import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand tag={Link} href="/">CoinCoin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  tag={Link} href="/">Home</Nav.Link>
            <Nav.Link  tag={Link} href="/explorer">Explorer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar;