/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/app/index";
import { setCredentials } from "@/features/auth";
import { useLoginMutation } from "@/services/auth";
import { toast } from "@/utils";
import { UserLoginRequestBodyTypes } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Login(): JSX.Element {
  const [formData, setFormData] = useState<UserLoginRequestBodyTypes>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login(formData)
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          toast.success(res.message);
          dispatch(setCredentials(res.data?.accessToken ?? ""));
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.data?.message ?? error?.message ?? "Error");
      });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mb-3">
        <label
          htmlFor="email"
          className="form-label"
        >
          Email address
        </label>
        <input
          name="email"
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          onChange={handleOnChange}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="password"
          className="form-label"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleOnChange}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
      >
        Login sinih
      </Button>
    </form>
  );
}
