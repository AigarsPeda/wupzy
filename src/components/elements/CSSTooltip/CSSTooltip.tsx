import type { FC, ReactNode } from "react";
import classNames from "utils/classNames";

interface CSSTooltipProps {
  children: ReactNode;
  tooltipClassName?: string;
  tooltipWrapperClassName?: string;
  tooltipContent: JSX.Element | JSX.Element[] | string;
}

const CSSTooltip: FC<CSSTooltipProps> = ({
  children,
  tooltipContent,
  tooltipClassName,
  tooltipWrapperClassName,
}) => {
  return (
    <div
      className={classNames(
        tooltipWrapperClassName ? tooltipWrapperClassName : "",
        "group relative cursor-pointer"
      )}
    >
      {children}
      <div
        className={classNames(
          tooltipClassName ? tooltipClassName : "bottom-0",
          "bg-giraffe-dark absolute -z-[100] w-auto min-w-[115px] rounded-md px-2 py-2 text-center opacity-0 transition-all duration-300 hover:pointer-events-auto group-hover:z-[100] group-hover:opacity-100"
        )}
      >
        {tooltipContent}
      </div>
    </div>
  );
};

export default CSSTooltip;
