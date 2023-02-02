import LoginForm from "components/elements/LoginForm/LoginForm";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/api";
import setCookie from "utils/setCookie";

const Login: NextPage = () => {
  const router = useRouter();
  const { mutate, data } = api.users.loginUser.useMutation();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
  };

  const handleLogin = () => {
    const { email, password } = signUpForm;

    mutate({
      email,
      password,
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
        <h1>Login</h1>
        <LoginForm
          handleLogin={handleLogin}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Login;
