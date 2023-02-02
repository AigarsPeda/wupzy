import SignUpForm from "components/elements/SignUpForm/SignUpForm";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/api";
import setCookie from "utils/setCookie";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { data, isError, mutate } = api.users.signUpUser.useMutation();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    confirmPassword: "",
  });

  const handleSignUp = () => {
    const { lastName, firstName, email, password } = signUpForm;

    mutate({
      email,
      password,
      lastName,
      firstName,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
  };

  useEffect(() => {
    if (data?.token) {
      setCookie("token", data?.token, 1);
      router.push("/games").catch((err) => console.error(err));
    }
  }, [data?.token, router]);

  return (
    <div>
      <div>
        <h1 className="text-4xl">Create new account</h1>
        <SignUpForm
          handleSignUp={handleSignUp}
          handleInputChange={handleInputChange}
        />
        {isError && <p className="text-red-500">Something went wrong!</p>}
      </div>
    </div>
  );
};

export default SignUp;
