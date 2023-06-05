import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

interface GradientButtonProps {
  btnTitle: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleClick: () => void;
  btnType?: "button" | "submit" | "reset";
}

const GradientButton: FC<GradientButtonProps> = ({
  btnTitle,
  handleClick,
  isLoading = false,
  isDisabled = false,
  btnType = "button",
}) => {
  const isNotActionable = isLoading || isDisabled;

  return (
    <button
      type={btnType}
      onClick={handleClick}
      disabled={isNotActionable}
      className={classNames(
        isNotActionable && "cursor-not-allowed",
        "group relative inline-flex items-center justify-center overflow-hidden rounded-md p-0.5 font-bold"
      )}
    >
      <span
        className={classNames(
          !isNotActionable &&
            "group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]",
          "absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]"
        )}
      ></span>
      <span
        className={classNames(
          !isNotActionable && "group-hover:bg-opacity-0",
          "duration-400 relative flex h-11 min-w-[8rem] items-center justify-center rounded bg-gray-900 px-6 transition-all ease-out"
        )}
      >
        {isLoading ? (
          <Spinner color="light" size="xs" />
        ) : (
          <span
            className={classNames(
              !isNotActionable ? "text-white" : "text-gray-500",
              "relative"
            )}
          >
            {btnTitle}
          </span>
        )}
      </span>
    </button>
  );
};

export default GradientButton;
