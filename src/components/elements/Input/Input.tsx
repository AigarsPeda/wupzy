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
        <input
          type="text"
          id={inputFor}
          name={inputFor}
          value={inputVal}
          placeholder={inputPlaceholder}
          autoComplete={inputAutocomplete}
          className="mx-0.5 block w-full rounded-md border border-gray-300 bg-transparent py-1.5 pl-2 text-gray-900 outline-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 sm:max-w-md sm:text-sm sm:leading-6"
          onChange={(e) => handleInputChange(e.target.value)}
          ref={(() => {
            // If ref is passed, use it, otherwise use null
            if (ref) return ref;
            return null;
          })()}
        />
      </div>
    </>
  )
);

Input.displayName = "Input";

export default Input;
