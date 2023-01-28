import type { NextPage } from "next";
import { useState } from "react";
import { api } from "../utils/api";

const SignUp: NextPage = () => {
  const createUser = api.users.createUser.useMutation();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    confirmPassword: "",
  });

  const handleLogin = () => {
    const { lastName, firstName, email, password } = signUpForm;

    console.log("createUser.isSuccess 1", createUser.isSuccess);

    createUser.mutate({
      email,
      password,
      lastName,
      firstName,
    });

    console.log("createUser.data ------> ?", createUser.data); // created user

    console.log("createUser.failureReason ------>", createUser.failureReason);

    console.log("createUser.error ------>", createUser.error?.data);
    console.log("createUser.error", createUser.error);
    console.log("createUser.isError", createUser.isError);
    console.log("createUser.isSuccess 2", createUser.isSuccess);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
  };

  return (
    <div>
      <h1 className="text-4xl">Sign Up</h1>
      {console.log(signUpForm)}
      <form>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleLogin}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
