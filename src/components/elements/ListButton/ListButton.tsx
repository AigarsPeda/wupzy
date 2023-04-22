import type { FC } from "react";
import classNames from "utils/classNames";

interface TournamentProps {
  isDisabled?: boolean;
  btnColor?: "gray" | "red" | "green";
  handleClick: () => void;
  btnTitle: string | number | JSX.Element;
}

const ListButton: FC<TournamentProps> = ({
  btnTitle,
  isDisabled,
  handleClick,
  btnColor = "gray",
}) => {
  return (
    <button
      className={classNames(
        isDisabled && "cursor-not-allowed bg-gray-200 text-gray-500",
        // : "cursor-pointer bg-gray-50 text-gray-700",
        !isDisabled && btnColor === "red" && "bg-red-50 text-red-700",
        !isDisabled && btnColor === "green" && "bg-green-50 text-green-700",
        !isDisabled && btnColor === "gray" && "bg-gray-50 text-gray-700",
        "flex h-full w-full items-center justify-center rounded px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      )}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {btnTitle}
    </button>
  );
};

export default ListButton;
