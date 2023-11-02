import { forwardRef } from "react";
import { HiMinus, HiPlusSm } from "react-icons/hi";
import classNames from "~/utils/classNames";

interface NumberInputProps {
  value: number;
  height?: string;
  isBorder?: boolean;
  isFullWidth?: boolean;
  onChange: (value: number) => void;
}

type Ref = HTMLInputElement;

const NumberInput = forwardRef<Ref, NumberInputProps>(
  ({ value, height, onChange, isBorder, isFullWidth }, ref) => (
    <>
      <div
        className={classNames(
          height ? height : "h-11",
          isFullWidth ? "w-full" : "w-28",
          isBorder && "border-2 border-gray-950",
          "relative flex flex-row overflow-hidden rounded-lg bg-transparent p-0 shadow"
        )}
      >
        <button
          data-action="decrement"
          className="flex h-full w-20 cursor-pointer items-center justify-center rounded-l-[0.05rem] bg-gray-50 text-gray-950 outline-none transition-all hover:bg-gray-950 hover:text-gray-50"
          onClick={() => {
            if (value > 0) {
              onChange(value - 1);
            }
          }}
        >
          <HiMinus className="h-4 w-4" />
        </button>
        <input
          ref={(() => {
            if (ref) return ref;
            return null;
          })()}
          type="text"
          pattern="[0-9]*"
          name="input-number"
          value={value || "0"}
          className="text-md md:text-basecursor-default flex w-full items-center bg-gray-50 text-center font-primary text-lg font-semibold text-gray-950 outline-none hover:text-black focus:text-black focus:outline-none"
          onFocus={(e) => {
            if (e.target.value === "0") {
              e.target.value = "";
            }
          }}
          onChange={(e) => {
            onChange(parseInt(e.target.value));
          }}
        ></input>
        <button
          data-action="increment"
          className="flex h-full w-20 cursor-pointer items-center justify-center rounded-r-[0.05rem] bg-gray-50 text-gray-950 transition-all hover:bg-gray-950 hover:text-gray-50"
          onClick={() => {
            onChange(value + 1);
          }}
        >
          <HiPlusSm className="h-5 w-5" />
        </button>
      </div>
    </>
  )
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
