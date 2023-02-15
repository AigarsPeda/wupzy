import type { FC } from "react";
import { classNames } from "utils/classNames";

interface RoundButtonProps {
  btnClass?: string;
  handleClick: () => void;
  btnType?: "submit" | "button";
  btnContent: JSX.Element | string;
  bgColor: "green" | "gray" | "violet" | "outline";
}

const RoundButton: FC<RoundButtonProps> = ({
  bgColor,
  btnClass,
  btnContent,
  handleClick,
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      className={classNames(
        btnClass ? btnClass : "",
        bgColor === "gray"
          ? "bg-gray-800 text-white hover:shadow-gray-400"
          : "",
        bgColor === "green"
          ? "bg-green-500 text-white hover:shadow-green-400"
          : "",
        bgColor === "violet"
          ? "bg-violet-500 text-white hover:shadow-violet-400"
          : "",
        bgColor === "outline"
          ? "border-2 border-gray-700 bg-white text-gray-700 hover:shadow-gray-400"
          : "",
        "rounded-full p-2 transition-all duration-200 hover:scale-105 hover:shadow-md"
      )}
      onClick={handleClick}
    >
      {btnContent}
    </button>
  );
};

export default RoundButton;
