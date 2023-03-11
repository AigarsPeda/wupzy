import type { FC } from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
}

const NumberInput: FC<NumberInputProps> = ({ value, onChange }) => {
  return (
    <div className="h-[2.6rem] w-[7.7rem]">
      <div className="relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent">
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
          value={value}
          type="number"
          name="input-number"
          onChange={(e) => onChange(parseInt(e.target.value))}
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
    </div>
  );
};

export default NumberInput;
