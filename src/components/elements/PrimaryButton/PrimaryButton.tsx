import { type FC } from "react";

interface PrimaryButtonProps {
  btnTitle: string;
  handleClick: () => void;
  btnType?: "button" | "submit" | "reset";
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  btnTitle,
  handleClick,
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      onClick={handleClick}
      className="focus:shadow-outline inline-flex h-11 items-center justify-center rounded-lg bg-gray-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-gray-800 focus:outline-none"
    >
      {btnTitle}
    </button>
  );
};

export default PrimaryButton;
