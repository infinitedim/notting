import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, UseNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { login } from "../features/auth/authSlice";

export default function LoginNote() {
  const navigate = UseNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogin = (formValue) => {
    const { email, password } = formValue;

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
        window.location.reload();
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group
        className="mb-3"
        controlId="formBasicEmail"
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We will never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicPassword"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
}
