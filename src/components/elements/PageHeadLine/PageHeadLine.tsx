import { type FC } from "react";

interface PageHeadLineProps {
  title: string;
}

const PageHeadLine: FC<PageHeadLineProps> = ({ title }) => {
  return <h1 className="mt-2 text-3xl">{title}</h1>;
};

export default PageHeadLine;
