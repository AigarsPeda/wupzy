import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "../../../utils/classNames";

interface GradientButtonProps {
  btnTitle: string;
  isLoading: boolean;
  handleClick: () => void;
  btnType?: "button" | "submit" | "reset";
}

const GradientButton: FC<GradientButtonProps> = ({
  btnTitle,
  isLoading,
  handleClick,
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      disabled={isLoading}
      onClick={handleClick}
      className={classNames(
        isLoading && "cursor-not-allowed",
        "group relative inline-flex items-center justify-center overflow-hidden rounded-md p-0.5 font-bold"
      )}
    >
      <span
        className={classNames(
          !isLoading &&
            "group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]",
          "absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]"
        )}
      ></span>
      <span
        className={classNames(
          !isLoading && "group-hover:bg-opacity-0",
          "duration-400 relative flex h-11 min-w-[8rem] items-center justify-center rounded bg-gray-900 px-6 transition-all ease-out"
        )}
      >
        {isLoading ? (
          <Spinner color="light" size="xs" />
        ) : (
          <span className="relative text-white">{btnTitle}</span>
        )}
      </span>
    </button>
  );
};

export default GradientButton;
