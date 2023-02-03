import LoginForm from "components/elements/LoginForm/LoginForm";
import { DEFAULT_REDIRECT_URL } from "hardcoded";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { api } from "utils/api";
import setCookie from "utils/setCookie";

const Login: NextPage = () => {
  const router = useRouter();
  const { redirectToPath } = useRedirect();
  const { isError, mutateAsync } = api.users.loginUser.useMutation();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = signUpForm;

    const res = await mutateAsync({
      email,
      password,
    });

    if (res.token) {
      setCookie("token", res.token, 1);

      const { redirect } = router.query;

      if (typeof redirect !== "string") {
        redirectToPath(DEFAULT_REDIRECT_URL);
        return;
      }

      redirectToPath(redirect);
    }
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
        <LoginForm
          handleLogin={handleLogin}
          handleInputChange={handleInputChange}
        />
        {isError && <p className="text-red-500">Something went wrong!</p>}
      </div>
    </div>
  );
};

export default Login;
