import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import Logo from "components/elements/Logo/Logo";
import PageHead from "components/elements/PageHead/PageHead";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { api } from "utils/api";

const Forgot: NextPage = () => {
  const [email, setEmail] = useState("");
  const { mutate, isSuccess, isLoading } =
    api.resetPassword.getResetToken.useMutation();

  return (
    <>
      <PageHead
        title="Wupzy | Forgot password"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <div className="mb-10">
        <Logo />
      </div>
      <div className="mt-32 md:mt-64">
        <div>
          <h1 className="mb-10 text-5xl">Reset your password</h1>
          <div className="items-center md:flex">
            <div className="w-72">
              <Input
                type="email"
                name="email"
                value={email}
                label="Email"
                isDisabled={isSuccess}
                handleInputChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            {isSuccess ? (
              <FcCheckmark className="h-10 w-10" />
            ) : (
              <Button
                btnTitle="Send"
                btnSize="small"
                isLoading={isLoading}
                btnClass="md:mt-8 mt-4"
                onClick={() => {
                  mutate({ email });
                }}
              />
            )}
          </div>
          <div className="mt-4">
            <Link href="/login" className="text-gray-500">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
