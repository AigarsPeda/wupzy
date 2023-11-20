import { type FC } from "react";
import classNames from "~/utils/classNames";

interface BubbleProps {
  message: string;
  isBubbleVisible: boolean;
  position?: "default" | "top-3";
}

const Bubble: FC<BubbleProps> = ({
  message,
  isBubbleVisible,
  position = "default",
}) => {
  return (
    <span
      className={classNames(
        isBubbleVisible
          ? "-translate-y-2 opacity-100"
          : "translate-y-3 opacity-0",
        position === "top-3" && "-top-3 right-0",
        position === "default" && "right-3 top-10",
        "absolute rounded-md bg-green-500 px-2 py-0.5 text-sm text-white transition-all duration-200 ease-in-out",
      )}
    >
      {message}
    </span>
  );
};

export default Bubble;
