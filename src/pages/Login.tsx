import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/app/index";
import { setCredentials } from "@/features/auth";
import { useLoginMutation, UserLoginRequestBodyTypes } from "@/services/auth";
import { toast } from "@/utils";

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
