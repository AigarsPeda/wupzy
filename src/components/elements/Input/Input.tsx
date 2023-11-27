import { forwardRef } from "react";
import classNames from "~/utils/classNames";

interface InputProps {
  inputFor: string;
  inputVal: string;
  isSmall?: boolean;
  inputLabel: string;
  inputPlaceholder?: string;
  inputAutocomplete?: string;
  handleInputChange: (e: string) => void;
  inputType?: "text" | "email" | "password";
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(
  (
    {
      isSmall,
      inputFor,
      inputVal,
      inputLabel,
      inputPlaceholder,
      inputAutocomplete,
      handleInputChange,
    },
    ref,
  ) => {
    const getInputFor = () => {
      return `${inputFor}-${inputVal}`;
    };

    return (
      <div className="w-full">
        <label
          htmlFor={getInputFor()}
          className={classNames(
            isSmall ? "mb-1 text-xs" : "mb-2 text-sm",
            "block w-full font-medium leading-6 text-gray-900",
          )}
        >
          {inputLabel}
        </label>

        <div className="mx-0.5">
          <input
            type="text"
            name={inputFor}
            value={inputVal}
            placeholder={inputPlaceholder}
            autoComplete={inputAutocomplete}
            id={getInputFor()}
            className="block w-full rounded-md border border-gray-300 bg-transparent py-1.5 pl-2 text-gray-900 outline-gray-800 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:ring-inset sm:text-sm sm:leading-6"
            onChange={(e) => handleInputChange(e.target.value)}
            ref={(() => {
              // If ref is passed, use it, otherwise use null
              if (ref) return ref;
              return null;
            })()}
          />
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
