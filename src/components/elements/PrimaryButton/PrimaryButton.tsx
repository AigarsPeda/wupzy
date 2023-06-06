import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

interface PrimaryButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  btnSize?: "sm" | "md";
  handleClick: () => void;
  btnTitle: string | JSX.Element;
  btnType?: "button" | "submit" | "reset";
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  btnTitle,
  isLoading,
  isDisabled,
  handleClick,
  btnSize = "md",
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      onClick={handleClick}
      disabled={isLoading || isDisabled}
      className={classNames(
        btnSize === "sm" && "min-w-[3rem]",
        btnSize === "md" && "min-w-[8rem]",
        isDisabled && "cursor-not-allowed bg-gray-800",
        "focus:shadow-outline relative inline-flex h-11 items-center justify-center rounded-lg bg-gray-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-gray-800 focus:outline-none"
      )}
    >
      {isLoading ? <Spinner color="light" size="xs" /> : btnTitle}
    </button>
  );
};

export default PrimaryButton;
