import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

interface ButtonProps {
  size?: "sm" | "md";
  isLoading?: boolean;
  isDisabled?: boolean;
  isSecondary?: boolean;
  handleClick?: () => void;
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
        isDisabled && "cursor-not-allowed bg-gray-800",
        size === "md" && "h-11 min-w-[7rem] px-6 text-sm md:h-11",
        size === "sm" && "h-11 min-w-[5rem] px-5 text-sm md:h-9",
        isSecondary
          ? "border-gray-300 bg-gray-300 text-gray-900 hover:bg-gray-400"
          : "border-gray-900 bg-gray-900 text-white hover:bg-gray-700",
        "focus:shadow-outline relative inline-flex border-collapse items-center justify-center whitespace-nowrap rounded-lg border-2 font-medium tracking-[0.055em] transition duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
      )}
    >
      {isLoading ? <Spinner color="light" size="xs" /> : title}
    </button>
  );
};

export default Button;
