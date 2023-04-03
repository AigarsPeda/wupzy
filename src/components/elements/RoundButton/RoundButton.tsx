import type { FC } from "react";
import classNames from "utils/classNames";

interface RoundButtonProps {
  btnClass?: string;
  icon?: JSX.Element;
  handleClick: () => void;
  btnType?: "submit" | "button";
  textSize?: "sm" | "md" | "lg";
  btnContentClassNames?: string;
  bgColor: "green" | "gray" | "violet" | "outline";
  btnContent?: JSX.Element | string | number | boolean;
}

const RoundButton: FC<RoundButtonProps> = ({
  icon,
  bgColor,
  btnClass,
  btnContent,
  handleClick,
  textSize = "md",
  btnType = "button",
  btnContentClassNames,
}) => {
  return (
    <button
      type={btnType}
      className={classNames(
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
        "flex items-center rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md",
        icon ? "px-4 py-2" : "p-2",
        textSize === "sm" ? "text-sm" : "",
        textSize === "md" ? "text-base" : "",
        textSize === "lg" ? "text-lg" : "",
        btnClass && btnClass
      )}
      onClick={handleClick}
    >
      {btnContent && (
        <span
          className={classNames(btnContentClassNames && btnContentClassNames)}
        >
          {btnContent}
        </span>
      )}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default RoundButton;
