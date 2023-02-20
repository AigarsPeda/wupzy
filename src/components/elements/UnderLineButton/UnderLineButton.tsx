import Spinner from "components/elements/Spinner/Spinner";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import { classNames } from "utils/classNames";

interface ButtonProps {
  icon?: ReactNode;
  btnClass?: string;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  btnColor?: "underline";
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
        !isDisabled && btnColor === "underline" ? "bg-white text-gray-800" : "",
        "group relative flex items-center text-center text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100",
        btnClass ? btnClass : ""
      )}
    >
      {iconPosition === "left" && icon && (
        <span className="pointer-events-none text-gray-600">{icon}</span>
      )}
      {isLoading ? <Spinner size="small" /> : btnTitle}
      {iconPosition === "right" && icon && (
        <span className="pointer-events-none text-gray-600">{icon}</span>
      )}
      <span
        className={classNames(
          "absolute -bottom-0.5 h-1 w-full overflow-hidden rounded-md bg-gray-300"
        )}
      />
      <span
        className={classNames(
          !isDisabled && btnColor === "underline"
            ? "w-0 group-hover:w-full group-hover:bg-gray-800"
            : "",
          "z-1 absolute -bottom-0.5 h-1 rounded-md transition-all duration-300"
        )}
      />
    </button>
  )
);

UnderLineButton.displayName = "UnderLineButton";

export default UnderLineButton;
