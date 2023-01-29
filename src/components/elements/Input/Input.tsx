import type { FC } from "react";

interface InputProps {
  name: string;
  label: string;
  type: "text" | "password" | "email";
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ type, name, label, handleInputChange }) => {
  return (
    <div className="my-4">
      <div className="relative">
        <input
          name={name}
          type={type}
          placeholder={label}
          onChange={handleInputChange}
          className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-gray-700 focus:outline-none"
        />
        <label
          htmlFor={name}
          className="pointer-events-none absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
