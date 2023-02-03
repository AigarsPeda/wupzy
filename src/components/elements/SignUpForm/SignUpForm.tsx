import type { FC } from "react";
import Input from "components/elements/Input/Input";

interface SignUpFormProps {
  handleSignUp: () => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpForm: FC<SignUpFormProps> = ({
  handleSignUp,
  handleInputChange,
}) => {
  return (
    <form
      className="grid w-1/6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp().catch(() => console.error("Error signing up"));
      }}
    >
      <Input
        type="text"
        label="First name"
        name="firstName"
        handleInputChange={handleInputChange}
      />
      <Input
        type="text"
        label="Last name"
        name="lastName"
        handleInputChange={handleInputChange}
      />
      <Input
        type="email"
        label="Email"
        name="email"
        handleInputChange={handleInputChange}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        handleInputChange={handleInputChange}
      />
      <Input
        type="password"
        label="Confirm password"
        name="confirmPassword"
        handleInputChange={handleInputChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
