import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/app/index";
import { setUser } from "@/features/auth";
import { useRegisterMutation } from "@/services/auth";
import { toast } from "@/utils";
import { UserRegisterRequestBodyTypes } from "@/types";
import { Form, Button } from "react-bootstrap";

export default function Register(): JSX.Element {
  const [formData, setFormData] = useState<UserRegisterRequestBodyTypes>({
    name: "",
    email: "",
    password: "",
  });

  const [register] = useRegisterMutation();
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

    register(formData)
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          toast.success(res.message);
          console.log(res.data);
          dispatch(setUser(res.data as { name: string; email: string }));
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
        controlId="formBasicFullName"
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Fullname"
          onChange={handleOnChange}
        />
      </Form.Group>
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
