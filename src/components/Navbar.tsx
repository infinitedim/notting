import { logout } from "@/features/auth";
import { useAppDispatch } from "@/app/index";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Navbars(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Navbar
      bg="transparent"
      variant="light"
    >
      <Container>
        <Navbar.Brand href="#home">Notting</Navbar.Brand>
        <Nav className="d-flex justify-content-end">
          {" "}
          <Nav.Link
            as={Link}
            to="/"
          >
            <Button
              variant="outline-danger"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
