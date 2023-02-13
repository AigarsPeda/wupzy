import type { FC } from "react";
import { classNames } from "utils/classNames";

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const Switch: FC<SwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <label
      htmlFor="toggle-switch"
      className="flex h-8 w-14 cursor-pointer select-none items-center"
    >
      <div
        className={classNames(
          isOn ? "bg-slate-800" : "bg-slate-500",
          "relative block h-full w-full rounded-full"
        )}
      >
        <input
          checked={isOn}
          type="checkbox"
          id="toggle-switch"
          className="sr-only"
          onClick={handleToggle}
        />
        <div
          className={classNames(
            isOn ? "right-1 animate-slide-right" : "left-1 animate-slide-left",
            "absolute top-1/2 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full bg-gray-300 transition-all duration-300 ease-in-out"
          )}
        ></div>
      </div>
    </label>
  );
};

export default Switch;
