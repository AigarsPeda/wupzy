import type { FC, ReactNode } from "react";
import classNames from "utils/classNames";

interface GridLayoutProps {
  isGap?: boolean;
  isDivideX?: boolean;
  children: JSX.Element | JSX.Element[] | ReactNode;
  minWith?: "150" | "175" | "200" | "250" | "320" | "350" | "700";
}

const GridLayout: FC<GridLayoutProps> = ({
  isGap,
  children,
  isDivideX,
  minWith = "150",
}) => {
  return (
    <div
      className={classNames(
        isGap && "gap-5",
        isDivideX && "divide-x divide-gray-200",
        minWith === "350" &&
          "md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]",
        minWith === "700" && "grid-cols-[repeat(auto-fit,minmax(700px,1fr))]",
        minWith === "320" && "grid-cols-[repeat(auto-fit,minmax(320px,1fr))]",
        minWith === "250" && "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
        minWith === "200" && "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
        minWith === "175" && "grid-cols-[repeat(auto-fit,minmax(175px,1fr))]",
        minWith === "150" && "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
        "mb-5 grid w-full"
      )}
    >
      {children}
    </div>
  );
};

export default GridLayout;
