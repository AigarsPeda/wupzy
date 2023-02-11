import type { FC } from "react";
import { classNames } from "utils/classNames";

export type InputErrorType = {
  field: string;
  message: string;
};

interface InputProps {
  name: string;
  label: string;
  error?: InputErrorType;
  isDisabled?: boolean;
  type: "text" | "password" | "email";
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  type,
  name,
  error,
  label,
  isDisabled,
  handleInputChange,
}) => {
  return (
    <div className="my-4">
      <div className="relative">
        <input
          name={name}
          type={type}
          placeholder={label}
          disabled={isDisabled}
          onChange={handleInputChange}
          className={classNames(
            error?.message
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-gray-700",
            "peer h-10 w-full border-b-2 text-gray-900 placeholder-transparent transition-all  focus:outline-none disabled:cursor-not-allowed disabled:bg-transparent"
          )}
        />
        <label
          htmlFor={name}
          className={classNames(
            isDisabled
              ? "peer-placeholder-shown:text-gray-200"
              : "peer-placeholder-shown:text-gray-400",
            "pointer-events-none absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          )}
        >
          {label}
        </label>

        {error?.message && (
          <p className="absolute mt-1 text-xs text-red-500">{error.message}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
