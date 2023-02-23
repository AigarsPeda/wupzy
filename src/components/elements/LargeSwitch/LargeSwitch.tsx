import type { FC } from "react";
import classNames from "utils/classNames";

interface LargeSwitchProps {
  isOn: boolean;
  firstLabel: string;
  secondLabel: string;
  handleToggle: () => void;
}

const LargeSwitch: FC<LargeSwitchProps> = ({
  isOn,
  firstLabel,
  secondLabel,
  handleToggle,
}) => {
  return (
    <button
      onClick={handleToggle}
      className="relative flex h-10 items-center justify-between rounded-md bg-gray-300 px-6 py-1"
    >
      <span
        className={classNames(
          isOn ? "text-white" : "",
          "z-10 mr-8 transition-all duration-150 ease-in-out"
        )}
      >
        {firstLabel}
      </span>
      <span
        className={classNames(
          !isOn ? "text-white" : "",
          "z-10 transition-all duration-150 ease-in-out"
        )}
      >
        {secondLabel}
      </span>
      <div
        className={classNames(
          isOn ? "-translate-x-full" : "translate-x-[-0.5rem]",
          "absolute left-1/2 m-1 h-8 w-1/2 rounded bg-gray-800 text-transparent shadow shadow-gray-400 transition-all duration-150 ease-in-out"
        )}
      ></div>
    </button>
  );
};

export default LargeSwitch;
