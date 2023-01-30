import type { NextPage } from "next";
import { useState } from "react";
import SignUpForm from "../components/elements/SignUpForm/SignUpForm";
import { api } from "../utils/api";

const SignUp: NextPage = () => {
  const signUpUser = api.users.signUpUser.useMutation();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    confirmPassword: "",
  });

  const handleLogin = () => {
    const { lastName, firstName, email, password } = signUpForm;

    signUpUser.mutate({
      email,
      password,
      lastName,
      firstName,
    });

    console.log("createUser.data ------> ?", signUpUser.data); // created user

    console.log("signUpUser.failureReason ------>", signUpUser.failureReason);

    console.log("signUpUser.error ------>", signUpUser.error?.data);
    console.log("signUpUser.error", signUpUser.error);
    console.log("signUpUser.isError", signUpUser.isError);
    console.log("signUpUser.isSuccess 2", signUpUser.isSuccess);
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
        {signUpUser.isError && (
          <p className="text-red-500">Something went wrong!</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
