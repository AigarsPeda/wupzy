import { forwardRef } from "react";

interface InputProps {
  inputFor: string;
  inputVal: string;
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
      inputFor,
      inputVal,
      inputLabel,
      inputPlaceholder,
      inputAutocomplete,
      handleInputChange,
    },
    ref
  ) => (
    <>
      <label
        htmlFor={inputFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {inputLabel}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-900 sm:max-w-md">
          <input
            type="text"
            id={inputFor}
            name={inputFor}
            value={inputVal}
            placeholder={inputPlaceholder}
            autoComplete={inputAutocomplete}
            className="mx-2 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline outline-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            onChange={(e) => handleInputChange(e.target.value)}
            ref={(() => {
              // If ref is passed, use it, otherwise use null
              if (ref) return ref;
              return null;
            })()}
          />
        </div>
      </div>
    </>
  )
);

Input.displayName = "Input";

export default Input;
