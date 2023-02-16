import type { FC, ReactNode } from "react";
import { classNames } from "utils/classNames";

interface GridLayoutProps {
  minWith?: "150px" | "175px" | "200px" | "250px";
  children: JSX.Element | JSX.Element[] | ReactNode;
}

const GridLayout: FC<GridLayoutProps> = ({ minWith = "150px", children }) => {
  return (
    <div
      className={classNames(
        minWith === "250px"
          ? "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
          : "",
        minWith === "200px"
          ? "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
          : "",
        minWith === "175px"
          ? "grid-cols-[repeat(auto-fit,minmax(175px,1fr))]"
          : "",
        minWith === "150px"
          ? "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
          : "",
        "mb-5 grid w-full gap-5"
      )}
    >
      {children}
    </div>
  );
};

export default GridLayout;
