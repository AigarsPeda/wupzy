import { type FC } from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative h-1.5 w-full rounded-full bg-gray-300">
      <div
        className="flex h-1.5 items-center justify-center overflow-hidden rounded-full bg-green-500 text-center font-medium leading-none text-blue-100 transition-all duration-200"
        style={{ width: `${progress}%` }}
      >
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform font-primary text-lg font-semibold text-gray-900">
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
