import type { FC } from "react";
import classNames from "~/utils/classNames";

interface TooltipProps {
  content: string;
  position?: string;
  isNowrap?: boolean;
  placement?: "top" | "bottom";
  children: JSX.Element | string;
}

const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  position,
  isNowrap,
  placement = "top",
}) => {
  return (
    <div className="group relative max-w-md cursor-pointer">
      {children}
      <div
        className={classNames(
          isNowrap && "whitespace-nowrap",
          !position && placement === "top" && "bottom-full",
          !position && placement === "bottom" && "top-full",
          position ? position : "left-1/2 -translate-x-1/2",
          "pointer-events-none absolute z-[100] transform rounded bg-gray-900 p-2 text-sm text-white opacity-0 transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100"
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
