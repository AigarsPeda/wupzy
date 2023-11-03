import { type FC } from "react";
import classNames from "~/utils/classNames";

interface PageHeadLineProps {
  isLight?: boolean;
  title: string | undefined;
}

const PageHeadLine: FC<PageHeadLineProps> = ({ title, isLight }) => {
  return (
    <div className="max-w-md">
      <h1
        className={classNames(
          isLight ? "text-white" : "text-gray-900",
          "truncate text-4xl"
        )}
      >
        {title || ""}
      </h1>
    </div>
  );
};

export default PageHeadLine;
