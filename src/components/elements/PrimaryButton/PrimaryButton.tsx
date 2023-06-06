import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";

interface PrimaryButtonProps {
  btnTitle: string;
  isLoading?: boolean;
  handleClick: () => void;
  btnType?: "button" | "submit" | "reset";
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  btnTitle,
  isLoading,
  handleClick,
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      onClick={handleClick}
      className="focus:shadow-outline relative inline-flex h-11 min-w-[8rem] items-center justify-center rounded-lg bg-gray-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-gray-800 focus:outline-none"
    >
      {isLoading ? <Spinner color="light" size="xs" /> : btnTitle}
    </button>
  );
};

export default PrimaryButton;
