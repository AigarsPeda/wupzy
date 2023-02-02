import Input from "components/elements/Input/Input";
import type { FC } from "react";

interface LoginFormProps {
  handleLogin: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: FC<LoginFormProps> = ({ handleLogin, handleInputChange }) => {
  return (
    <form className="grid w-1/6">
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

      <button type="button" onClick={handleLogin}>
        Sign Up
      </button>
    </form>
  );
};

export default LoginForm;
