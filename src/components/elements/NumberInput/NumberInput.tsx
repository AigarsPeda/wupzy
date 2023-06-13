import type { FC } from "react";
import classNames from "~/utils/classNames";
import { BiPlus, BiMinus } from "react-icons/bi";

interface NumberInputProps {
  value: number;
  height?: string;
  onChange: (value: number) => void;
}

const NumberInput: FC<NumberInputProps> = ({ value, height, onChange }) => {
  return (
    <div
      className={classNames(
        height ? height : "h-10",
        "relative flex w-28 flex-row rounded-lg border-2 border-transparent bg-transparent"
      )}
    >
      <button
        data-action="decrement"
        className="flex h-full w-20 cursor-pointer items-center justify-center rounded-l bg-gray-300 text-gray-800 outline-none transition-all hover:bg-gray-400 hover:text-gray-700"
        onClick={() => {
          if (value > 0) {
            onChange(value - 1);
          }
        }}
      >
        {/* <span className="m-auto text-2xl font-thin">−</span> */}
        <BiMinus className="h-4 w-4" />
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
        className="text-md md:text-basecursor-default flex w-full items-center bg-gray-300 text-center font-semibold text-gray-700 outline-none hover:text-black focus:text-black focus:outline-none"
      ></input>
      <button
        data-action="increment"
        className="flex h-full w-20 cursor-pointer items-center justify-center rounded-r bg-gray-300 text-gray-800 transition-all hover:bg-gray-400 hover:text-gray-700"
        onClick={() => {
          onChange(value + 1);
        }}
      >
        {/* <span className="m-auto text-2xl font-thin">+</span> */}
        <BiPlus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default NumberInput;
