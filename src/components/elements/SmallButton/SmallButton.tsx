import Spinner from "components/elements/Spinner/Spinner";
import type { FC } from "react";
import classNames from "utils/classNames";

interface SmallButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  btnClassNames?: string;
  handleClick: () => void;
  btnColor?: "gray" | "red";
  btnTitle: string | JSX.Element;
}

const SmallButton: FC<SmallButtonProps> = ({
  btnTitle,
  isDisabled,
  handleClick,
  btnClassNames,
  isLoading = false,
  btnColor = "gray",
}) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      className={classNames(
        btnColor === "red" && "bg-red-600 text-white",
        btnColor === "gray" && "bg-gray-200 hover:bg-gray-800 hover:text-white",
        "flex items-center justify-center rounded-md text-sm transition-all duration-150 ease-in-out",
        isDisabled && "relative cursor-not-allowed opacity-50",
        btnClassNames ? btnClassNames : ""
      )}
      onClick={handleClick}
    >
      {isLoading ? <Spinner size="xs" /> : btnTitle}
    </button>
  );
};

export default SmallButton;
