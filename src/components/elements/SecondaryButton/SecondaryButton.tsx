import { type ReactNode, type FC } from "react";

interface SecondaryButtonProps {
  btnTitle: string;
  btnIcon?: ReactNode;
  isBtnDisabled?: boolean;
  handleClick: () => void;
  type?: "button" | "submit" | "reset";
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
  btnIcon,
  btnTitle,
  handleClick,
  type = "button",
  isBtnDisabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isBtnDisabled}
      className="inline-flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
    >
      {btnIcon}
      {btnTitle}
    </button>
  );
};

export default SecondaryButton;
