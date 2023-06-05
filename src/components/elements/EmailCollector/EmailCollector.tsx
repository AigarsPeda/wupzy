import { useState, type FC } from "react";
import GradientButton from "~/components/elements/GradientButton/GradientButton";
import GradientInput from "~/components/elements/GradientInput/GradientInput";
import { api } from "~/utils/api";

const EmailCollector: FC = () => {
  const [email, setEmail] = useState("");
  const { mutate } = api.emailListRouter.postEmail.useMutation();

  return (
    <div className="flex ">
      <div className="mr-2 w-96">
        <GradientInput value={email} handleInputChange={setEmail} />
      </div>
      <GradientButton
        btnTitle="Submit"
        handleClick={() => {
          mutate({ email });
          setEmail("");
        }}
      />
    </div>
  );
};

export default EmailCollector;
