import ErrorMessage from "components/elements/ErrorMessage/ErrorMessage";
import { forwardRef } from "react";
import classNames from "utils/classNames";

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
  size?: "sm" | "lg";
  isMargin?: boolean;
  isDisabled?: boolean;
  error?: InputErrorType;
  isCapitalized?: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(
  (
    {
      name,
      error,
      label,
      value,
      isDisabled,
      type = "text",
      size = "lg",
      isMargin = true,
      handleInputChange,
      isCapitalized = false,
    },
    ref
  ) => (
    <>
      <div
        className={classNames(isMargin && "my-2 md:my-4", "relative w-full")}
      >
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
          type={InputTypes[type] ?? "password"}
          className={classNames(
            size === "sm" ? "h-6 text-sm placeholder:text-xs" : "",
            size === "lg" ? "h-10" : "",
            error?.message
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-gray-700",
            "peer w-full border-b-2 text-gray-900 placeholder-transparent transition-all focus:outline-none disabled:cursor-not-allowed disabled:bg-transparent"
          )}
        />
        <label
          htmlFor={name}
          className={classNames(
            size === "sm" &&
              "-top-2.5 text-xs peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs md:-top-3.5 md:peer-focus:-top-3.5",
            size === "lg" &&
              "-top-3.5 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm md:peer-focus:-top-3.5",
            isDisabled
              ? "peer-placeholder-shown:text-gray-200"
              : "peer-placeholder-shown:text-gray-400",
            isCapitalized && "capitalize",
            "pointer-events-none absolute left-0 text-gray-600 transition-all  peer-focus:text-gray-600"
          )}
        >
          {label}
        </label>

        {error?.message && (
          <div className="absolute">
            <ErrorMessage message={error.message} />
          </div>
        )}
      </div>
    </>
  )
);

Input.displayName = "Input";

export default Input;
