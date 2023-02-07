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
  //   weight: ["300", "400", "500", "600", "700", "800"],
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
          ? "border-2 border-gray-800 bg-white text-gray-800"
          : "",
        "rounded-md p-2.5 font-bold transition-all duration-200 hover:scale-105 hover:shadow-md"
      )}
      onClick={handleClick}
    >
      {btnContent}
    </button>
  );
};

export default RoundButton;
