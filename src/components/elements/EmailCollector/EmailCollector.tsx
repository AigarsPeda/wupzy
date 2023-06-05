import { useState, type FC } from "react";
import GradientButton from "~/components/elements/GradientButton/GradientButton";
import GradientInput from "~/components/elements/GradientInput/GradientInput";
import { api } from "~/utils/api";

const EmailCollector: FC = () => {
  const [email, setEmail] = useState("");
  const { mutate, isSuccess, isLoading } =
    api.emailListRouter.postEmail.useMutation();

  return (
    <div className="mx-auto flex w-full justify-center">
      {isSuccess ? (
        <p className="text-center text-2xl font-black text-gray-900">
          Thanks for signing up! We&apos;ll let you know when we&apos;re ready
          to launch.
        </p>
      ) : (
        <div className="mx-auto flex w-full flex-col items-center justify-center md:flex-row">
          <div className="mx-3 mb-3 w-full max-w-[24rem] md:mb-0 md:mr-2">
            <GradientInput value={email} handleInputChange={setEmail} />
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <GradientButton
              btnTitle="Submit"
              isLoading={isLoading}
              handleClick={() => {
                mutate({ email });
                setEmail("");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailCollector;
