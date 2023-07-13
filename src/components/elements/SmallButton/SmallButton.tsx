import { type FC } from "react";
import classNames from "~/utils/classNames";

interface SmallButtonProps {
  title?: string;
  icon?: JSX.Element;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  handleClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?: "red" | "gray" | "green" | "blue" | "orange" | "dark" | "pink";
}

const SmallButton: FC<SmallButtonProps> = ({
  icon,
  title,
  isDisabled,
  handleClick,
  isFullWidth,
  color = "gray",
  type = "button",
}) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      className={classNames(
        isFullWidth && "w-full",
        isDisabled && "cursor-not-allowed opacity-50",
        color === "red" && "bg-red-600 text-white hover:bg-red-700",
        color === "gray" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
        color === "green" && "bg-green-500 text-white hover:bg-green-600",
        color === "blue" && "bg-indigo-500 text-white hover:bg-indigo-600",
        color === "orange" && "bg-orange-500 text-white hover:bg-orange-600",
        color === "dark" && "bg-gray-800 text-white hover:bg-gray-900",
        color === "pink" && "bg-pink-500 text-white hover:bg-pink-600",
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium"
      )}
    >
      {icon}
      {title}
    </button>
  );
};

export default SmallButton;
