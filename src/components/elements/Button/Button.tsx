import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

interface ButtonProps {
  size?: "sm" | "md";
  isLoading?: boolean;
  isDisabled?: boolean;
  isSecondary?: boolean;
  handleClick: () => void;
  title: string | JSX.Element;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  title,
  isLoading,
  isDisabled,
  handleClick,
  isSecondary,
  size = "md",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isLoading || isDisabled}
      className={classNames(
        size === "sm" && "min-w-[3rem] px-5 text-sm",
        size === "md" && "min-w-[8rem] px-6",
        isDisabled && "cursor-not-allowed bg-gray-800",
        isSecondary
          ? "border-collapse border-2 border-gray-300 bg-gray-300 text-gray-900 hover:bg-gray-400"
          : "border-collapse border-2 border-gray-900 bg-gray-900 text-white hover:bg-gray-800",
        "focus:shadow-outline relative inline-flex h-11 items-center justify-center rounded-lg  font-medium tracking-wide transition duration-200 focus:outline-none"
      )}
    >
      {isLoading ? <Spinner color="light" size="xs" /> : title}
    </button>
  );
};

export default Button;
