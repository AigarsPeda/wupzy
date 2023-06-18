import { type FC, type ReactNode } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

interface SecondaryButtonProps {
  title: string;
  icon?: ReactNode;
  isLoading?: boolean;
  isFullWidth?: boolean;
  isSmallTitle?: boolean;
  color?: "dark" | "gray";
  isBtnDisabled?: boolean;
  handleClick: () => void;
  type?: "button" | "submit" | "reset";
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
  icon,
  title,
  handleClick,
  isSmallTitle,
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
          "bg-gray-100 text-gray-800 hover:bg-gray-300 focus:ring-gray-800",
        color === "dark" && "bg-gray-800 text-gray-50 hover:bg-gray-700",
        isFullWidth && "w-full",
        isSmallTitle
          ? "min-h-[2.6em] min-w-[4rem] px-4 py-2 text-sm"
          : "min-h-[2.6rem] min-w-[5rem] px-4 py-2 text-sm",
        "relative inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-inset"
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
