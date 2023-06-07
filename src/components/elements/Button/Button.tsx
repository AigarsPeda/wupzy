import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

interface ButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  isSecondary?: boolean;
  btnSize?: "sm" | "md";
  handleClick: () => void;
  btnTitle: string | JSX.Element;
  btnType?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  btnTitle,
  isLoading,
  isDisabled,
  handleClick,
  isSecondary,
  btnSize = "md",
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      onClick={handleClick}
      disabled={isLoading || isDisabled}
      className={classNames(
        btnSize === "sm" && "min-w-[3rem]",
        btnSize === "md" && "min-w-[8rem]",
        isDisabled && "cursor-not-allowed bg-gray-800",
        isSecondary
          ? "border-collapse border-2 border-gray-300 bg-gray-300 text-gray-900 hover:bg-gray-400"
          : "border-collapse border-2 border-gray-900 bg-gray-900 text-white hover:bg-gray-800",
        "focus:shadow-outline relative inline-flex h-11 items-center justify-center rounded-lg px-6 font-medium tracking-wide transition duration-200 focus:outline-none"
      )}
    >
      {isLoading ? <Spinner color="light" size="xs" /> : btnTitle}
    </button>
  );
};

export default Button;
