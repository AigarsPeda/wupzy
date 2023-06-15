import { type FC } from "react";

interface PageHeadLineProps {
  title: string | undefined;
}

const PageHeadLine: FC<PageHeadLineProps> = ({ title }) => {
  return (
    <div className=" max-w-md">
      <h1 className="mt-2 truncate text-3xl">{title || ""}</h1>
    </div>
  );
};

export default PageHeadLine;
