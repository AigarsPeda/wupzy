import Button from "components/elements/Button/Button";
import type { InputErrorType } from "components/elements/Input/Input";
import Input from "components/elements/Input/Input";
import Link from "next/link";
import type { FC } from "react";

type LinkType = {
  href: string;
  text: string | JSX.Element;
};

interface FormProps {
  link: LinkType;
  disabledInputs?: string[];
  errors?: InputErrorType[];
  inputs: { [key in string]: string };
  handleLogin: () => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: FC<FormProps> = ({
  link,
  inputs,
  errors,
  handleLogin,
  disabledInputs,
  handleInputChange,
}) => {
  return (
    <>
      <form
        className="grid w-full max-w-sm pr-10"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin().catch(() => console.error("Error logging in"));
        }}
      >
        {Object.entries(inputs).map(([key, value]) => {
          const error = errors?.find((error) => error.field === key);
          const isDisabled = disabledInputs?.includes(key);

          return (
            <Input
              key={key}
              type={key}
              name={key}
              label={key}
              value={value}
              error={error}
              isDisabled={isDisabled}
              handleInputChange={handleInputChange}
            />
          );
        })}

        <Button
          btnClass="mt-8"
          btnTitle="Login"
          onClick={() => {
            handleLogin().catch(() => console.error("Error logging in"));
          }}
        />
      </form>
      <Link href={link.href} className="mt-4 pr-10 text-gray-500">
        {link.text}
      </Link>
    </>
  );
};

export default Form;
