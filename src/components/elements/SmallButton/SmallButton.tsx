import type { FC } from "react";
import classNames from "utils/classNames";

interface SmallButtonProps {
  btnClassNames?: string;
  handleClick: () => void;
  btnColor?: "gray" | "red";
  btnTitle: string | JSX.Element;
}

const SmallButton: FC<SmallButtonProps> = ({
  btnTitle,
  handleClick,
  btnClassNames,
  btnColor = "gray",
}) => {
  return (
    <button
      className={classNames(
        btnColor === "red" && "bg-red-500 text-white",
        btnColor === "gray" && "bg-gray-200 hover:bg-gray-800 hover:text-white",
        "ml-2 rounded-md text-sm",
        btnClassNames ? btnClassNames : ""
      )}
      onClick={handleClick}
    >
      {btnTitle}
    </button>
  );
};

export default SmallButton;
