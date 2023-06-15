import { type FC, type ReactNode } from "react";
import classNames from "~/utils/classNames";
import Spinner from "../Spinner/Spinner";

interface SecondaryButtonProps {
  title: string;
  icon?: ReactNode;
  isLoading?: boolean;
  isFullWidth?: boolean;
  color?: "dark" | "gray";
  isBtnDisabled?: boolean;
  handleClick: () => void;
  type?: "button" | "submit" | "reset";
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
  icon,
  title,
  handleClick,
  color = "gray",
  type = "button",
  isLoading = false,
  isFullWidth = false,
  isBtnDisabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isBtnDisabled || isLoading}
      className={classNames(
        color === "gray" &&
          "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-800",
        color === "dark" && "bg-gray-800 text-gray-50 hover:bg-gray-700",
        isFullWidth && "w-full",
        "relative inline-flex min-h-[2.5rem] min-w-[5rem] items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset"
      )}
    >
      {isLoading ? (
        <Spinner size="xs" color="light" />
      ) : (
        <>
          {icon}
          {title}
        </>
      )}
    </button>
  );
};

export default SecondaryButton;
