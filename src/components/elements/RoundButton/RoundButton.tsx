import type { FC } from "react";
import { classNames } from "utils/classNames";

interface RoundButtonProps {
  btnClass?: string;
  bgColor: "green" | "gray";
  btnType: "submit" | "button";
  btnContent: JSX.Element | string;
  handleClick: () => void;
}

const RoundButton: FC<RoundButtonProps> = ({
  btnType,
  bgColor,
  btnClass,
  btnContent,
  handleClick,
}) => {
  return (
    <button
      type={btnType}
      className={classNames(
        btnClass ? btnClass : "",
        bgColor === "gray" ? "bg-gray-500 hover:shadow-gray-400 " : "",
        bgColor === "green" ? "bg-green-500 hover:shadow-green-400" : "",
        "rounded-full p-2.5 font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-md"
      )}
      onClick={handleClick}
    >
      {btnContent}
    </button>
  );
};

export default RoundButton;
