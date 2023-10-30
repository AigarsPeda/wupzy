import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

interface GradientButtonProps {
  title: string;
  icon?: JSX.Element;
  isLoading?: boolean;
  isDisabled?: boolean;
  bgColor?: string;
  handleClick: () => void;
  type?: "button" | "submit" | "reset";
}

const GradientButton: FC<GradientButtonProps> = ({
  icon,
  title,
  bgColor,
  handleClick,
  isLoading = false,
  isDisabled = false,
  type = "button",
}) => {
  const isNotActionable = isLoading || isDisabled;

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isNotActionable}
      className={classNames(
        isNotActionable && "cursor-not-allowed",
        "group relative inline-flex items-center justify-center overflow-hidden rounded-md p-0.5 tracking-[0.06em] transition duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
      )}
    >
      <span
        className={classNames(
          "absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]"
        )}
      ></span>
      <span
        className={classNames(
          !isNotActionable && "group-hover:bg-gray-900 group-hover:text-white",
          bgColor || "bg-gray-100",
          "duration-400 relative flex h-11 min-w-[8rem] items-center justify-center rounded px-6 transition-all ease-out"
        )}
      >
        {isLoading ? (
          <Spinner color="light" size="xs" />
        ) : (
          <span
            className={classNames(
              !isNotActionable
                ? "text-gray-900 group-hover:text-white"
                : "text-gray-500",
              "relative flex items-center justify-center"
            )}
          >
            {title}
            {icon && <span className="ml-4">{icon}</span>}
          </span>
        )}
      </span>
    </button>
  );
};

export default GradientButton;
