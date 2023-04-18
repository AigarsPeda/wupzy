import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import Logo from "components/elements/Logo/Logo";
import Spinner from "components/elements/Spinner/Spinner";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/api";
import useRedirect from "../../../hooks/useRedirect";

const ResetPassword: NextPage = () => {
  const { query } = useRouter();

  const [userId, setUserId] = useState("");
  const { redirectToPath } = useRedirect();
  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate } = api.users.changePassword.useMutation({
    onSuccess: () => {
      redirectToPath("/login");
    },
  });
  const { data, isError, isLoading } = api.resetPassword.validateToken.useQuery(
    {
      token: resetToken,
    }
  );

  useEffect(() => {
    if (!query.resettoken || typeof query.resettoken !== "string") return;

    setResetToken(query.resettoken);
  }, [query.resettoken, query.userId]);

  useEffect(() => {
    if (!data) return;

    setUserId(data.userId);
  }, [data]);

  if (isLoading) return <Spinner />;

  if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <div className="mb-10 transition-all md:mb-20 lg:mb-40">
        <Logo />
      </div>
      <div className="mt-32 md:mt-64">
        <div className="">
          <h1 className="mb-10 text-5xl">Enter new password</h1>
          <div className="items-center md:flex">
            <div className="w-72">
              <Input
                type="password"
                value={password}
                name="password"
                label="Password"
                handleInputChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                label="Confirm password"
                handleInputChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <Button
            btnSize="small"
            btnTitle="Reset"
            btnClass="md:mt-8 mt-4"
            onClick={() => {
              console.log("userId", userId);
              console.log("password", password);
              console.log("resetToken", resetToken);
              mutate({ userId, password, token: resetToken });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
