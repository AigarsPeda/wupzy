import type { FC } from "react";
import { classNames } from "utils/classNames";

interface GridLayoutProps {
  minWith?: "150px" | "175px";
  children: JSX.Element | JSX.Element[];
}

const GridLayout: FC<GridLayoutProps> = ({ minWith = "150px", children }) => {
  return (
    <div
      className={classNames(
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
