import type { InputsType } from "components/elements/Form/Form";
import Form from "components/elements/Form/Form";
import Logo from "components/elements/Logo/Logo";
import SignupLoginImage from "components/elements/SignupLoginImage/SignupLoginImage";
import { DEFAULT_REDIRECT_URL } from "hardcoded";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useReducer } from "react";
import { api } from "utils/api";
import setCookie from "utils/setCookie";
import signUpReducer from "reducers/signUpReducer";

const INPUTS: InputsType[] = [
  {
    type: "text",
    name: "firstName",
    placeholder: "First Name",
  },
  {
    type: "text",
    name: "lastName",
    placeholder: "Last Name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    type: "password",
    name: "confirmPassword",
    placeholder: "Confirm Password",
  },
];

const SignUp: NextPage = () => {
  const router = useRouter();
  const { redirectToPath } = useRedirect();
  const { isError, mutateAsync } = api.users.signUpUser.useMutation();
  const [signUpForm, setSignUpForm] = useReducer(signUpReducer, {
    form: {
      email: "",
      lastName: "",
      password: "",
      firstName: "",
      confirmPassword: "",
    },
    error: [],
  });

  const handleSignUp = async () => {
    const {
      form: { lastName, firstName, email, password },
    } = signUpForm;

    console.log("signUpForm.form", signUpForm.form);

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
            inputs={INPUTS}
            link={{
              href: "/signup",
              text: (
                <>
                  If you already have an account,{" "}
                  <span className="font-bold text-gray-900">click here</span> to
                  log in
                </>
              ),
            }}
            handleLogin={handleSignUp}
            handleInputChange={handleInputChange}
          />
          {isError && <p className="text-red-500">Something went wrong!</p>}
        </div>
        <SignupLoginImage />
      </div>
    </>
  );
};

export default SignUp;
