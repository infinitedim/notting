import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Navbars(): JSX.Element {
  return (
    <Navbar
      bg="light"
      variant="light"
    >
      <Container>
        <Navbar.Brand href="#home">Notting</Navbar.Brand>
        <Nav className="d-flex justify-content-end">
          <Nav.Link className="text-decoration-none">
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link className="text-decoration-none">
            <Link to="/new">Create Notes</Link>
          </Nav.Link>
          <Nav.Link className="text-decoration-none">
            <Link to="/archive">Archive Notes</Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
