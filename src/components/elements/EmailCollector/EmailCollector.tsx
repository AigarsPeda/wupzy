import { useState, type FC } from "react";
import GradientButton from "~/components/elements/GradientButton/GradientButton";
import GradientInput from "~/components/elements/GradientInput/GradientInput";
import { api } from "~/utils/api";

const EmailCollector: FC = () => {
  const [email, setEmail] = useState("");
  const { mutate, isSuccess, isLoading } =
    api.emailListRouter.postEmail.useMutation();

  return (
    <div className="flex">
      {isSuccess ? (
        <p className="text-center text-2xl font-black text-gray-900">
          Thanks for signing up! We&apos;ll let you know when we&apos;re ready
          to launch.
        </p>
      ) : (
        <>
          <div className="mr-2 w-96">
            <GradientInput value={email} handleInputChange={setEmail} />
          </div>
          <GradientButton
            btnTitle="Submit"
            isLoading={isLoading}
            handleClick={() => {
              mutate({ email });
              setEmail("");
            }}
          />
        </>
      )}
    </div>
  );
};

export default EmailCollector;
