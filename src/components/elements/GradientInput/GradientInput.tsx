import { forwardRef } from "react";

export type InputErrorType = {
  field: string;
  message: string;
};

interface InputProps {
  value: string;
  handleInputChange: (str: string) => void;
}

type Ref = HTMLInputElement;

const GradientInput = forwardRef<Ref, InputProps>(
  ({ value, handleInputChange }, ref) => (
    <div className="h-12 w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5">
      <input
        ref={(() => {
          // If ref is passed, use it, otherwise use null
          if (ref) return ref;
          return null;
        })()}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        className="h-full w-full rounded border-none bg-white text-center text-xl font-black text-gray-900 outline-none"
      />
    </div>
  )
);

GradientInput.displayName = "GradientInput";

export default GradientInput;

{
  /* <a href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
<span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
<span class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
<span class="relative text-white">Button Text</span>
</span>
</a> */
}
