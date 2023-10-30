import type { ReactNode } from "react";
import { forwardRef } from "react";
import classNames from "~/utils/classNames";

interface GridLayoutProps {
  isGap?: boolean;
  isDivideX?: boolean;
  children: JSX.Element | JSX.Element[] | ReactNode;
  minWith?:
    | "40"
    | "150"
    | "175"
    | "200"
    | "250"
    | "275"
    | "300"
    | "320"
    | "350"
    | "400"
    | "500"
    | "700"
    | "150-033";
}

type Ref = HTMLInputElement;

const GridLayout = forwardRef<Ref, GridLayoutProps>(
  ({ isGap, children, isDivideX, minWith = "150" }, ref) => (
    <div
      ref={(() => {
        // If ref is passed, use it, otherwise use null
        if (ref) return ref;
        return null;
      })()}
      className={classNames(
        isGap && "gap-5",
        isDivideX && "divide-x divide-gray-200",
        minWith === "350" &&
          "md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]",
        minWith === "500" && "grid-cols-[repeat(auto-fit,minmax(500px,1fr))]",
        minWith === "300" && "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]",
        minWith === "400" && "grid-cols-[repeat(auto-fit,minmax(400px,1fr))]",
        minWith === "700" && "grid-cols-[repeat(auto-fit,minmax(700px,1fr))]",
        minWith === "320" && "grid-cols-[repeat(auto-fit,minmax(320px,1fr))]",
        minWith === "275" && "grid-cols-[repeat(auto-fit,minmax(275px,1fr))]",
        minWith === "250" && "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
        minWith === "200" && "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
        minWith === "175" && "grid-cols-[repeat(auto-fit,minmax(175px,1fr))]",
        minWith === "150" && "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
        minWith === "40" && "grid-cols-[repeat(auto-fit,minmax(40px,1fr))]",
        minWith === "150-033" &&
          "grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(150px,0.34fr))]",
        "mb-5 grid w-full"
      )}
    >
      {children}
    </div>
  )
);

GridLayout.displayName = "GridLayout";

export default GridLayout;
