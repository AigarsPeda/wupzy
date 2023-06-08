import { useState, type FC } from "react";
import GradientButton from "~/components/elements/GradientButton/GradientButton";
import GradientInput from "~/components/elements/GradientInput/GradientInput";
import { api } from "~/utils/api";
import isEmail from "~/utils/isEmail";

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ email });
            setEmail("");
          }}
          className="mx-auto flex w-full flex-col items-center justify-center md:flex-row"
        >
          <div className="mx-3 mb-3 w-full max-w-[24rem] md:mb-0 md:mr-2">
            <GradientInput
              type="email"
              value={email}
              placeholder="Your email"
              handleInputChange={setEmail}
            />
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <GradientButton
              type="submit"
              title="Submit"
              isLoading={isLoading}
              isDisabled={!isEmail(email.trim())}
              handleClick={() => {
                mutate({ email });
                setEmail("");
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EmailCollector;
