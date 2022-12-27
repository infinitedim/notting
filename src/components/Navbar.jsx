import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Navbars() {
  return (
    <Navbar
      bg="transparent"
      variant="light"
    >
      <Container>
        <Navbar.Brand href="#home">Notting</Navbar.Brand>
        <Nav className="d-flex justify-content-end">
          <Nav.Link
            as={Link}
            to="/"
          >
            <Button variant="outline-danger">Logout</Button>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/archived"
          >
            <Button variant="outline-warning">Archived Notes</Button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
