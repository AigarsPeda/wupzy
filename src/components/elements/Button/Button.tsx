import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

interface ButtonProps {
  size?: "sm" | "md";
  icon?: JSX.Element;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleClick?: () => void;
  title: string | JSX.Element;
  color?: "light" | "dark" | "red";
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  icon,
  title,
  isLoading,
  isDisabled,
  handleClick,
  size = "md",
  color = "dark",
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
        color === "light" &&
          "border-gray-300 bg-gray-300 text-gray-900 hover:bg-gray-400",
        color === "dark" &&
          "border-gray-900 bg-gray-900 text-white hover:bg-gray-700",
        color === "red" &&
          "border-red-500 bg-red-500 text-white hover:bg-red-700",
        "focus:shadow-outline relative flex w-full border-collapse items-center justify-center space-x-2 whitespace-nowrap rounded-lg border-2 font-medium tracking-[0.055em] transition duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
      )}
    >
      {isLoading ? (
        <Spinner color="light" size="xs" />
      ) : (
        <>
          {icon} {title}
        </>
      )}
    </button>
  );
};

export default Button;
