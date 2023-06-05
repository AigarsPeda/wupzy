import { forwardRef } from "react";

interface InputProps {
  value: string;
  placeholder?: string;
  inputType: "email" | "password" | "text";
  handleInputChange: (str: string) => void;
}

type Ref = HTMLInputElement;

const GradientInput = forwardRef<Ref, InputProps>(
  ({ value, inputType, placeholder, handleInputChange }, ref) => (
    <div className="h-12 w-full rounded-md bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5">
      <input
        ref={(() => {
          // If ref is passed, use it, otherwise use null
          if (ref) return ref;
          return null;
        })()}
        value={value}
        type={inputType}
        placeholder={placeholder || ""}
        onChange={(e) => handleInputChange(e.target.value)}
        className="h-full w-full rounded border-none bg-white text-center text-xl font-black text-gray-900 outline-none"
      />
    </div>
  )
);

GradientInput.displayName = "GradientInput";

export default GradientInput;
