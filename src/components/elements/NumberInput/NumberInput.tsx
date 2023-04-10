import type { FC } from "react";
import classNames from "../../../utils/classNames";

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
        "relative flex w-32 flex-row rounded-lg border-2 border-transparent bg-transparent"
      )}
    >
      <button
        data-action="decrement"
        className="h-full w-20 cursor-pointer rounded-l bg-gray-300 text-gray-600 outline-none transition-all hover:bg-gray-400 hover:text-gray-700"
        onClick={() => {
          if (value > 0) {
            onChange(value - 1);
          }
        }}
      >
        <span className="m-auto text-2xl font-thin">−</span>
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
        className="h-full w-20 cursor-pointer rounded-r bg-gray-300 text-gray-600 transition-all hover:bg-gray-400 hover:text-gray-700"
        onClick={() => {
          onChange(value + 1);
        }}
      >
        <span className="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  );
};

export default NumberInput;
