import type { FC } from "react";
import { HiMinus, HiPlusSm } from "react-icons/hi";
import classNames from "~/utils/classNames";

interface NumberInputProps {
  value: number;
  height?: string;
  onChange: (value: number) => void;
}

const NumberInput: FC<NumberInputProps> = ({ value, height, onChange }) => {
  return (
    <div
      className={classNames(
        height ? height : "h-11",
        "relative flex w-[7.5rem] border-collapse flex-row rounded-lg border-transparent bg-transparent"
      )}
    >
      <button
        data-action="decrement"
        className="flex h-full w-20 cursor-pointer items-center justify-center rounded-l bg-gray-200 text-gray-800 outline-none transition-all hover:bg-gray-400 hover:text-white"
        onClick={() => {
          if (value > 0) {
            onChange(value - 1);
          }
        }}
      >
        <HiMinus className="h-4 w-4" />
      </button>
      <input
        type="text"
        pattern="[0-9]*"
        name="input-number"
        value={value || "0"}
        onFocus={(e) => {
          if (e.target.value === "0") {
            e.target.value = "";
          }
        }}
        onChange={(e) => {
          const num = parseInt(e.target.value);
          onChange(num);
        }}
        className="text-md md:text-basecursor-default flex w-full items-center bg-gray-200 text-center font-primary text-lg font-semibold text-gray-700 outline-none hover:text-black focus:text-black focus:outline-none"
      ></input>
      <button
        data-action="increment"
        className="flex h-full w-20 cursor-pointer items-center justify-center rounded-r bg-gray-200 text-gray-800 transition-all hover:bg-gray-400 hover:text-white"
        onClick={() => {
          onChange(value + 1);
        }}
      >
        <HiPlusSm className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NumberInput;
