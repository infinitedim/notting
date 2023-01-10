/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/app/index";
import { setCredentials } from "@/features/auth";
import { useLoginMutation } from "@/services/auth";
import { toast } from "@/utils";
import { UserLoginRequestBodyTypes } from "@/types";
import { useNavigate } from "react-router-dom";

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
    <div className="container p-4">
      <form onSubmit={handleOnSubmit}>
        <input
          type="email"
          name="email"
          id=""
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="password"
          id=""
          onChange={handleOnChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
