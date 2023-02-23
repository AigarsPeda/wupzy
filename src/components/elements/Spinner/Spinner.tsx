import type { FC } from "react";
import classNames from "utils/classNames";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
}

const Spinner: FC<SpinnerProps> = ({ size = "medium" }) => {
  return (
    <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 transform">
      <div
        className={classNames(
          size === "large" ? "h-64 w-64" : "",
          size === "small" ? "h-16 w-16" : "",
          size === "medium" ? "h-32 w-32" : "",
          "animate-spin rounded-full border-8 border-solid border-gray-900 border-t-transparent"
        )}
      ></div>
    </div>
  );
};

export default Spinner;
