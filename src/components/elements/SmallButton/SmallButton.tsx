import { type FC } from "react";
import classNames from "~/utils/classNames";
import Spinner from "../Spinner/Spinner";

interface SmallButtonProps {
  title?: string;
  icon?: JSX.Element;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  iconMaxWidth?: string;
  handleClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?:
    | "red"
    | "gray"
    | "green"
    | "blue"
    | "orange"
    | "dark"
    | "pink"
    | "purple";
}

const SmallButton: FC<SmallButtonProps> = ({
  icon,
  title,
  isLoading,
  isDisabled,
  handleClick,
  isFullWidth,
  iconMaxWidth,
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
        color === "pink" && "bg-pink-500 text-white hover:bg-pink-600",
        color === "dark" && "bg-gray-800 text-white hover:bg-gray-900",
        color === "gray" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
        color === "green" && "bg-green-500 text-white hover:bg-green-600",
        color === "blue" && "bg-indigo-500 text-white hover:bg-indigo-600",
        color === "orange" && "bg-orange-500 text-white hover:bg-orange-600",
        color === "purple" && "bg-purple-500 text-white hover:bg-purple-600",
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium"
      )}
    >
      {isLoading ? (
        <Spinner color="dark" size="xs" />
      ) : (
        <span
          className={classNames(
            iconMaxWidth && iconMaxWidth,
            "flex h-full items-center justify-between"
          )}
        >
          {title}
          {icon}
        </span>
      )}
    </button>
  );
};

export default SmallButton;
