import { FC } from "react";
import classNames from "~/utils/classNames";

interface PrimaryButtonProps {
  isMailto?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  handleClick: () => void;
  color?: "dark" | "light";
  padding?: "sm" | "md" | "lg";
  children: string | React.ReactNode;
  btnType?: "button" | "submit" | "reset";
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  isDisabled,
  isSelected,
  isFullWidth,
  handleClick,
  padding = "md",
  color = "light",
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      disabled={isDisabled}
      onClick={handleClick}
      className={classNames(
        isSelected && color === "light" && "bg-gray-900 text-white",
        !isSelected &&
          color === "light" &&
          "bg-white text-gray-900 hover:bg-gray-50",
        isSelected && color === "dark" && "bg-gray-900 text-white",
        !isSelected && color === "dark" && "bg-gray-900 text-white",
        isFullWidth && "w-full",
        padding === "sm" && "px-2 py-1",
        padding === "md" && "px-4 py-2",
        padding === "lg" && "px-6 py-3",
        "relative flex items-center justify-center rounded-md border border-gray-900 text-center text-sm font-normal shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      )}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
