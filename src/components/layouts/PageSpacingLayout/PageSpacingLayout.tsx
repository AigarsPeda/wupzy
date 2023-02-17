import type { FC } from "react";

interface PageSpacingLayoutProps {
  children: React.ReactNode;
}

const PageSpacingLayout: FC<PageSpacingLayoutProps> = ({ children }) => {
  return <div className="py-4">{children}</div>;
};

export default PageSpacingLayout;
