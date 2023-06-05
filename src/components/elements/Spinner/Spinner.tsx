import type { FC } from "react";
import classNames from "~/utils/classNames";

type ColorType = "dark" | "light";

interface SpinnerProps {
  color?: ColorType;
  size?: "small" | "medium" | "large" | "xs";
}

const Spinner: FC<SpinnerProps> = ({ size = "medium", color = "dark" }) => {
  return (
    <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transform">
      <div
        className={classNames(
          size === "xs" && "h-6 w-6 border-4",
          size === "large" && "h-64 w-64 border-8",
          size === "small" && "h-14 w-14 border-4",
          size === "medium" && "h-32 w-32 border-8",
          color === "dark" && "border-gray-900",
          color === "light" && "border-gray-100",
          "animate-spin rounded-full border-solid border-t-transparent"
        )}
      ></div>
    </div>
  );
};

export default Spinner;
