import ErrorMessage from "components/elements/ErrorMessage/ErrorMessage";
import Form from "components/elements/Form/Form";
import Logo from "components/elements/Logo/Logo";
import PageHead from "components/elements/PageHead/PageHead";
import SignupLoginImage from "components/elements/SignupLoginImage/SignupLoginImage";
import Spinner from "components/elements/Spinner/Spinner";
import { DEFAULT_REDIRECT_URL } from "hardcoded";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useEffect, useReducer, useState } from "react";
import signupReducer from "reducers/signUpReducer";
import { api } from "utils/api";
import setCookie from "utils/cookie";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { redirectToPath } = useRedirect();
  const [stripeSessionId, setStripeSessionId] = useState("");
  const [userId, setUserId] = useState<undefined | string>(undefined);
  const [disabledInputs, setDisabledInputs] = useState(["confirmPassword"]);
  const { isError, mutateAsync, error, isLoading } =
    api.users.signUpUser.useMutation();
  const { isLoading: isLoadingStripeUser, isError: isStripeError } =
    api.stripe.getStripeUser.useQuery(
      {
        sessionId: stripeSessionId,
      },
      {
        enabled: Boolean(stripeSessionId),
        onSuccess(data) {
          if (data.token) {
            setCookie("token", data.token, 365);
          }

          if (data.user) {
            setSignUpForm({
              ...signUpForm,
              form: {
                ...signUpForm.form,
                email: data.user.email,
                lastName: data.user.lastName,
                firstName: data.user.firstName,
              },
            });

            setUserId(data.user.id);
          }
        },
      }
    );

  const [signUpForm, setSignUpForm] = useReducer(signupReducer, {
    form: {
      lastName: "",
      firstName: "",
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
      userId,
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

  const isButtonDisabled = () => {
    const {
      form: { lastName, firstName, email, password, confirmPassword },
    } = signUpForm;

    if (
      email.length === 0 ||
      lastName.length === 0 ||
      password.length === 0 ||
      firstName.length === 0 ||
      confirmPassword.length === 0
    ) {
      return true;
    }

    if (signUpForm.error.length > 0) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!router.query.session_id || typeof router.query.session_id !== "string")
      return;

    setStripeSessionId(router.query.session_id);
  }, [router.query.session_id, router.query.user_id]);

  if (isStripeError) {
    return <ErrorMessage message="Something went wrong" />;
  }

  return (
    <>
      <PageHead
        title="Wupzy | Sign Up"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        <div className="mt-0 flex h-full w-full flex-col">
          <div className="lg:mb-30 mb-5 transition-all md:mb-16">
            <Logo />
          </div>
          <div>
            {isLoadingStripeUser || !stripeSessionId ? (
              <Spinner size="small" />
            ) : (
              <div className="flex">
                <div className="w-full md:w-1/2">
                  <Form
                    isLoading={isLoading}
                    submitBtnText="Sign Up"
                    inputs={signUpForm.form}
                    errors={signUpForm.error}
                    handleLogin={handleSignUp}
                    disabledInputs={disabledInputs}
                    isButtonDisabled={isButtonDisabled()}
                    handleInputChange={handleInputChange}
                  />
                </div>
                {isError && (
                  <ErrorMessage
                    message={
                      error?.message?.includes("email")
                        ? "Email is taken"
                        : "Something went wrong!"
                    }
                  />
                )}

                <SignupLoginImage />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
