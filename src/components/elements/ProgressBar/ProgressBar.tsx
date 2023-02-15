import type { FC } from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative h-4 w-full rounded-md bg-gray-200">
      <div
        className="flex h-4 items-center justify-center overflow-hidden rounded-md bg-gray-800 p-0.5 text-center text-xs font-medium leading-none text-blue-100 transition-all duration-200"
        style={{ width: `${progress}%` }}
      >
        <p className="font-primary-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-yellow-400">
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
