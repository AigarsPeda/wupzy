import Spinner from "components/elements/Spinner/Spinner";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import classNames from "utils/classNames";

interface ButtonProps {
  icon?: ReactNode;
  btnClass?: string;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  btnColor?: "underline";
  lineClassNames?: string;
  btnTitle: string | ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
}
type Ref = HTMLButtonElement;

const UnderLineButton = forwardRef<Ref, ButtonProps>(
  (
    {
      icon,
      onClick,
      btnTitle,
      btnClass,
      isLoading,
      isDisabled,
      lineClassNames,
      type = "button",
      btnColor = "underline",
      iconPosition = "right",
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      data-testid="button"
      disabled={isDisabled}
      className={classNames(
        isDisabled ? "cursor-not-allowed bg-gray-300" : "",
        icon ? "justify-between px-4 py-2" : "justify-center",
        !isDisabled && btnColor === "underline" ? "text-gray-800" : "",
        "group group relative flex items-center text-center text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none  focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100",
        btnClass ? btnClass : ""
      )}
    >
      {iconPosition === "left" && icon && (
        <span className="pointer-events-none text-gray-800">{icon}</span>
      )}
      {isLoading ? (
        <Spinner size="small" />
      ) : (
        <span className="transition-all duration-200 ease-in-out group-hover:scale-105">
          {" "}
          {btnTitle}{" "}
        </span>
      )}
      {iconPosition === "right" && icon && (
        <span className="pointer-events-none text-gray-800">{icon}</span>
      )}
      <span
        className={classNames(
          lineClassNames ? lineClassNames : "bottom-2",
          "absolute h-1 w-full overflow-hidden rounded-md bg-gray-300"
        )}
      />
      <span
        className={classNames(
          lineClassNames ? lineClassNames : "bottom-2",
          !isDisabled && btnColor === "underline"
            ? "w-0 group-hover:w-full group-hover:bg-gray-800"
            : "",
          "z-1 absolute h-1 rounded-md transition-all duration-300"
        )}
      />
    </button>
  )
);

UnderLineButton.displayName = "UnderLineButton";

export default UnderLineButton;
