import { FC } from "react";
import classNames from "~/utils/classNames";

interface PrimaryButtonProps {
  isMailto?: boolean;
  isSelected?: boolean;
  isFullWidth?: boolean;
  handleClick: () => void;
  color?: "dark" | "light";
  children: string | React.ReactNode;
  btnType?: "button" | "submit" | "reset";
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  isSelected,
  isFullWidth,
  handleClick,
  color = "light",
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      onClick={handleClick}
      className={classNames(
        isSelected && color === "light" && "bg-gray-900 text-white",
        !isSelected &&
          color === "light" &&
          "bg-white text-gray-900 hover:bg-gray-50",
        isSelected && color === "dark" && "bg-gray-900 text-white",
        !isSelected && color === "dark" && "bg-gray-900 text-white",
        isFullWidth && "w-full",
        "relative z-10 flex items-center justify-center rounded-md border border-gray-900 px-4 py-2 text-center text-base font-normal shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      )}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
