import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

interface OptionButtonProps {
  title: string;
  icon?: JSX.Element;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleClick: () => void;
  type?: "button" | "submit" | "reset";
  kind: "danger" | "warning" | "success" | "info";
}

const OptionButton: FC<OptionButtonProps> = ({
  icon,
  kind,
  title,
  isLoading,
  isDisabled,
  handleClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isLoading || isDisabled}
      className={classNames(
        kind === "danger" &&
          "bg-orange-400 text-gray-50 hover:bg-orange-400/80 focus:ring-orange-400/50",
        kind === "warning" &&
          "bg-yellow-500 text-gray-50 hover:bg-yellow-500/80 focus:ring-yellow-500/50",
        kind === "success" &&
          "bg-green-500 text-gray-50 hover:bg-green-500/80 focus:ring-green-500/50",
        kind === "info" &&
          "bg-blue-500 text-gray-50 hover:bg-blue-500/80 focus:ring-blue-500/50",

        "relative my-2 flex min-h-[2rem] w-full items-center justify-between rounded  px-4 py-1 font-primary text-sm  transition-all "
      )}
    >
      {isLoading ? (
        <Spinner size="xs" color="light" />
      ) : (
        <>
          {title} {icon && icon}
        </>
      )}
    </button>
  );
};

export default OptionButton;
