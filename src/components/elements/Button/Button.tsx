import type { ReactNode } from "react";
import { forwardRef } from "react";
import { classNames } from "utils/classNames";

interface ButtonProps {
  icon?: ReactNode;
  btnTitle: string;
  onClick: () => void;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  btnSize?: "large" | "default" | "small" | "full";
}
type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      icon,
      onClick,
      btnTitle,
      type = "button",
      btnSize = "default",
      iconPosition = "right",
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      data-testid="button"
      className={classNames(
        btnSize === "full" ? "h-10 w-full" : "",
        btnSize === "small" ? "h-8 w-24" : "",
        btnSize === "large" ? "h-11 w-48" : "",
        btnSize === "default" ? "h-11 w-32" : "",
        icon ? "flex items-center justify-between px-4 py-2" : "",
        "text-dark-gray rounded-md bg-white text-center text-sm font-semibold shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      )}
    >
      {iconPosition === "left" && icon && (
        <span className="pointer-events-none text-gray-600">{icon}</span>
      )}
      {btnTitle}
      {iconPosition === "right" && icon && (
        <span className="pointer-events-none text-gray-600">{icon}</span>
      )}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
