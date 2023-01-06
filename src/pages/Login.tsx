import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/app/index";
import { setCredentials } from "@/features/auth";
import { useLoginMutation } from "@/services/auth";
import { toast } from "@/utils";
import { UserLoginRequestBodyTypes } from "@/types";
import { Form, Button } from "react-bootstrap";

export default function Login(): JSX.Element {
  const [formData, setFormData] = useState<UserLoginRequestBodyTypes>({
    email: "",
    password: "",
  });

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    login(formData)
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          toast.success(res.message);
          dispatch(setCredentials(res.data?.accessToken ?? ""));
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.data?.message ?? error?.message ?? "Error");
      });
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group
        className="mb-3"
        controlId="formBasicEmail"
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleOnChange}
        />
        <Form.Text className="text-muted">
          Well never share your email with anyone else.
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
          onChange={handleOnChange}
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
