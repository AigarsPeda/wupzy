import { forwardRef } from "react";
import { classNames } from "utils/classNames";

export type InputErrorType = {
  field: string;
  message: string;
};

const InputTypes: { [key: string]: string } = {
  text: "text",
  email: "email",
  password: "password",
} as const;

interface InputProps {
  name: string;
  label: string;
  value: string;
  type?: string;
  isDisabled?: boolean;
  error?: InputErrorType;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(
  (
    { name, error, label, value, isDisabled, type = "text", handleInputChange },
    ref
  ) => (
    <>
      <div className="relative my-4 w-full">
        <input
          ref={(() => {
            // If ref is passed, use it, otherwise use null
            if (ref) return ref;
            return null;
          })()}
          name={name}
          value={value}
          placeholder={label}
          disabled={isDisabled}
          onChange={handleInputChange}
          type={InputTypes[type] || "password"}
          className={classNames(
            error?.message
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-gray-700",
            "peer h-10 w-full border-b-2 text-gray-900 placeholder-transparent transition-all focus:outline-none disabled:cursor-not-allowed disabled:bg-transparent"
          )}
        />
        <label
          htmlFor={name}
          className={classNames(
            isDisabled
              ? "peer-placeholder-shown:text-gray-200"
              : "peer-placeholder-shown:text-gray-400",
            "pointer-events-none absolute left-0 -top-3.5 text-sm capitalize text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          )}
        >
          {label}
        </label>

        {error?.message && (
          <p className="absolute mt-1 text-xs text-red-500">{error.message}</p>
        )}
      </div>
    </>
  )
);

Input.displayName = "Input";

export default Input;
