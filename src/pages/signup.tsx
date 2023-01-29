import type { NextPage } from "next";
import { useState } from "react";
import SignUpForm from "../components/elements/SignUpForm/SignUpForm";
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
      <div>
        <h1 className="text-4xl">Create new account</h1>
        <SignUpForm
          handleLogin={handleLogin}
          handleInputChange={handleInputChange}
        />
        {createUser.isError && (
          <p className="text-red-500">Something went wrong!</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
