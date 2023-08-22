import { type FC, type ReactNode } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

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
          "bg-gray-100 text-gray-800 hover:bg-gray-300 focus:ring-gray-800",
        color === "dark" && "bg-gray-800 text-gray-50 hover:bg-gray-700",
        isFullWidth && "w-full",
        "min-h-[2rem] min-w-[4.5rem] px-4 py-2",
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-normal tracking-[0.055em] transition-all focus:outline-none focus:ring-2 focus:ring-inset"
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
