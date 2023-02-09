import type { ReactNode } from "react";
import { forwardRef } from "react";
import { classNames } from "utils/classNames";

interface ButtonProps {
  icon?: ReactNode;
  btnTitle: string;
  btnClass?: string;
  onClick: () => void;
  btnColor?: "black" | "white";
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
      btnClass,
      type = "button",
      btnColor = "black",
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
        btnClass ? btnClass : "",
        btnSize === "small" ? "h-8 w-24" : "",
        btnSize === "large" ? "h-11 w-48" : "",
        btnSize === "full" ? "h-10 w-full" : "",
        btnSize === "default" ? "h-11 w-32" : "",
        icon ? "flex items-center justify-between px-4 py-2" : "",
        btnColor === "black" ? "bg-black text-white hover:shadow-gray-400" : "",
        "text-dark-gray rounded-md text-center text-sm font-semibold shadow transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
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
