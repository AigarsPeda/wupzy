import { type FC } from "react";
import classNames from "~/utils/classNames";

interface LoadingSkeletonProps {
  classes: string;
}

const LoadingSkeleton: FC<LoadingSkeletonProps> = ({ classes }) => {
  return (
    <div
      className={classNames(classes, "animate-pulse rounded-md bg-gray-200")}
    />
  );
};

export default LoadingSkeleton;
