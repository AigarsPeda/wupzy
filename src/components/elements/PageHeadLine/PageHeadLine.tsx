import { type FC } from "react";
import classNames from "~/utils/classNames";

interface PageHeadLineProps {
  isLight?: boolean;
  title: string | undefined;
}

const PageHeadLine: FC<PageHeadLineProps> = ({ title, isLight }) => {
  return (
    <h1
      className={classNames(
        isLight ? "text-white" : "text-gray-900",
        "max-w-[288px] truncate text-4xl md:max-w-[488px]",
      )}
    >
      {title || ""}
    </h1>
  );
};

export default PageHeadLine;
