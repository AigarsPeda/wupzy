import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import Link from "next/link";
import type { FC } from "react";

export type InputsType = {
  name: string;
  placeholder: string;
  type: "text" | "password" | "email";
};

type LinkType = {
  href: string;
  text: string | JSX.Element;
};

interface FormProps {
  link: LinkType;
  inputs: InputsType[];
  handleLogin: () => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: FC<FormProps> = ({
  link,
  inputs,
  handleLogin,
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
        {inputs.map((input) => (
          <Input
            key={input.name}
            type={input.type}
            name={input.name}
            label={input.placeholder}
            handleInputChange={handleInputChange}
          />
        ))}
        <Button
          type="submit"
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
