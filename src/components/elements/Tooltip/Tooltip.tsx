import type { FC } from "react";
import { classNames } from "utils/classNames";

interface TooltipProps {
  content: string;
  placement?: "top" | "bottom";
  position?: string;
  children: JSX.Element | string;
}

const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  position,
  placement = "top",
}) => {
  return (
    <div className="group relative max-w-md cursor-pointer">
      {children}
      <div
        className={classNames(
          placement === "top" ? "bottom-full" : "top-full",
          position ? position : "left-1/2 -translate-x-1/2",
          "pointer-events-none absolute w-40 transform rounded bg-gray-900 p-2 text-sm text-white opacity-0 transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100"
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
