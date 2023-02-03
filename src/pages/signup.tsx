import SignUpForm from "components/elements/SignUpForm/SignUpForm";
import { DEFAULT_REDIRECT_URL } from "hardcoded";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { api } from "utils/api";
import setCookie from "utils/setCookie";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { redirectToPath } = useRedirect();
  const { isError, mutateAsync } = api.users.signUpUser.useMutation();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    const { lastName, firstName, email, password } = signUpForm;

    const res = await mutateAsync({
      email,
      password,
      lastName,
      firstName,
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          handleSignUp={handleSignUp}
          handleInputChange={handleInputChange}
        />
        {isError && <p className="text-red-500">Something went wrong!</p>}
      </div>
    </div>
  );
};

export default SignUp;
