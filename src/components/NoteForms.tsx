import { Form } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";

export default function NoteForms(): JSX.Element {
  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
}
