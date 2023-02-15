import type { ReactNode } from "react";
import { forwardRef } from "react";
import { classNames } from "utils/classNames";

interface ButtonProps {
  icon?: ReactNode;
  btnClass?: string;
  onClick: () => void;
  isDisabled?: boolean;
  btnTitle: string | ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  btnColor?: "black" | "white" | "red" | "outline";
  btnSize?: "large" | "default" | "small" | "full" | "square";
}
type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      icon,
      onClick,
      btnTitle,
      btnClass,
      isDisabled,
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
        btnSize === "small" ? "h-11 w-24" : "",
        btnSize === "large" ? "h-11 w-48" : "",
        btnSize === "full" ? "h-10 w-full" : "",
        btnSize === "square" ? " h-11 w-11 " : "",
        btnSize === "default" ? "h-11 min-w-[8rem]" : "",
        isDisabled ? "cursor-not-allowed bg-gray-300" : "",
        icon ? "justify-between px-4 py-2" : "justify-center",
        !isDisabled && btnColor === "red"
          ? "bg-red-500 text-white hover:scale-105 hover:shadow-red-400"
          : "",
        !isDisabled && btnColor === "black"
          ? "bg-gray-800 text-white hover:scale-105 hover:shadow-gray-400"
          : "",
        !isDisabled && btnColor === "white"
          ? "bg-white text-black hover:scale-105 hover:shadow-gray-400"
          : "",
        !isDisabled && btnColor === "outline"
          ? "border-2 border-gray-800 bg-white text-gray-800 hover:scale-105 hover:shadow-gray-400"
          : "",
        "flex items-center rounded-md text-center text-sm font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100",
        btnClass ? btnClass : ""
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
