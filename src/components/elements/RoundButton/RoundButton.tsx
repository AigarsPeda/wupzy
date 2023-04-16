import type { FC } from "react";
import classNames from "utils/classNames";

interface RoundButtonProps {
  btnClass?: string;
  icon?: JSX.Element;
  handleClick: () => void;
  btnType?: "submit" | "button";
  textSize?: "sm" | "md" | "lg";
  btnContentClassNames?: string;
  btnContent?: JSX.Element | string | number | boolean;
  bgColor?: "green" | "dark" | "violet" | "outline" | "red";
}

const RoundButton: FC<RoundButtonProps> = ({
  icon,
  btnClass,
  btnContent,
  handleClick,
  textSize = "md",
  bgColor = "dark",
  btnType = "button",
  btnContentClassNames,
}) => {
  return (
    <button
      type={btnType}
      className={classNames(
        bgColor === "red" && "bg-red-600 text-white hover:shadow-red-400",
        bgColor === "dark" && "bg-gray-800 text-white hover:shadow-gray-400",
        bgColor === "green" && "bg-green-500 text-white hover:shadow-green-400",
        bgColor === "violet" &&
          "bg-violet-500 text-white hover:shadow-violet-400",
        bgColor === "outline" &&
          "border-2 border-gray-700 bg-white text-gray-700 hover:shadow-gray-400",
        "flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md",
        icon ? "px-4 py-2" : "p-2",
        textSize === "sm" && "text-sm",
        textSize === "md" && "text-base",
        textSize === "lg" && "text-lg",
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
