import Form from "components/elements/Form/Form";
import Logo from "components/elements/Logo/Logo";
import SignupLoginImage from "components/elements/SignupLoginImage/SignupLoginImage";
import { DEFAULT_REDIRECT_URL } from "hardcoded";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useReducer, useState } from "react";
import signupReducer from "reducers/signUpReducer";
import { api } from "utils/api";
import setCookie from "utils/cookie";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { redirectToPath } = useRedirect();
  const { isError, mutateAsync } = api.users.signUpUser.useMutation();
  const [disabledInputs, setDisabledInputs] = useState(["confirmPassword"]);
  const [signUpForm, setSignUpForm] = useReducer(signupReducer, {
    form: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    error: [],
  });

  const handleSignUp = async () => {
    const {
      form: { lastName, firstName, email, password },
    } = signUpForm;

    const res = await mutateAsync({
      email,
      password,
      lastName,
      firstName,
    });

    if (res.token) {
      setCookie("token", res.token, 365);

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

    // if the input is the password input, then we want to enable the confirm password input
    if (name === "password") {
      setDisabledInputs([]);
    }

    setSignUpForm({
      ...signUpForm,
      form: {
        ...signUpForm.form,
        [name]: value,
      },
    });
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        <div className="mt-0 flex h-full w-full flex-col">
          <div className="lg:mb-30 mb-5 transition-all md:mb-16">
            <Logo />
          </div>
          <Form
            submitBtnText="Sign Up"
            inputs={signUpForm.form}
            errors={signUpForm.error}
            handleLogin={handleSignUp}
            disabledInputs={disabledInputs}
            handleInputChange={handleInputChange}
            link={{
              href: "/login",
              text: (
                <>
                  If you already have an account,{" "}
                  <span className="font-bold text-gray-900">click here</span> to
                  log in
                </>
              ),
            }}
          />
          {isError && <p className="text-red-500">Something went wrong!</p>}
        </div>
        <SignupLoginImage />
      </div>
    </>
  );
};

export default SignUp;
