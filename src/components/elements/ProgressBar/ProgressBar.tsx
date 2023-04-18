import type { FC } from "react";
import classNames from "utils/classNames";

interface ProgressBarProps {
  progress: number;
  isProgressNumber?: boolean;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress, isProgressNumber }) => {
  return (
    <div
      className={classNames(
        isProgressNumber ? "h-4" : "h2",
        "relative w-full rounded-md bg-gray-200"
      )}
    >
      <div
        className={classNames(
          isProgressNumber ? "h-4" : "h2",
          "flex items-center justify-center overflow-hidden rounded-md bg-gray-800 p-0.5 text-center text-xs font-medium leading-none text-blue-100 transition-all duration-200"
        )}
        style={{ width: `${progress}%` }}
      >
        {isProgressNumber && (
          <p className="font-primary-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-yellow-400">
            {progress}%
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
