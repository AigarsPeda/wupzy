import Spinner from "components/elements/Spinner/Spinner";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import classNames from "utils/classNames";

interface ButtonProps {
  icon?: ReactNode;
  btnClass?: string;
  textClass?: string;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  btnTitle: string | ReactNode;
  fontSize?: "sm" | "md" | "lg";
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  btnColor?: "black" | "white" | "red" | "outline" | "underline";
  btnSize?: "large" | "default" | "small" | "full" | "square" | "xs";
}
type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      icon,
      onClick,
      btnTitle,
      btnClass,
      textClass,
      isLoading,
      isDisabled,
      fontSize = "md",
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
      onClick={() => {
        if (!isDisabled && !isLoading) {
          onClick();
        }
      }}
      data-testid="button"
      disabled={isDisabled}
      className={classNames(
        btnSize === "xs" && "h-8 px-2",
        btnSize === "small" && "h-11 w-24 md:h-9",
        btnSize === "large" && "h-11 w-48 md:h-9",
        btnSize === "full" && "h-full w-full",
        btnSize === "square" && "h-11 w-11 md:h-9 md:w-9",
        btnSize === "default" &&
          "h-11 min-w-[4rem] px-4 md:h-9 md:min-w-[7.7rem]",
        isDisabled && "cursor-not-allowed bg-gray-300",
        icon ? "justify-between px-4 py-2" : "justify-center",
        !isDisabled &&
          btnColor === "red" &&
          "bg-red-600 text-white hover:scale-105 hover:shadow-red-400",
        !isDisabled &&
          btnColor === "black" &&
          "bg-gray-800 text-white hover:scale-105 hover:shadow-gray-400",
        !isDisabled &&
          btnColor === "white" &&
          "bg-white text-black hover:scale-105 hover:shadow-gray-400",
        !isDisabled &&
          btnColor === "outline" &&
          "border-2 border-gray-800 bg-white text-gray-800 hover:scale-105 hover:shadow-gray-400",
        "relative flex min-w-[5.8rem] items-center justify-center rounded-md text-center shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100",
        fontSize === "sm" && "text-sm",
        fontSize === "md" && "text-xs md:text-sm",
        fontSize === "lg" && "text-lg",
        btnClass && btnClass
      )}
    >
      {iconPosition === "left" && icon && (
        <span className="pointer-events-none text-gray-600">{icon}</span>
      )}
      {isLoading ? (
        <Spinner size="xs" color={btnColor !== "black" ? "dark" : "light"} />
      ) : (
        <span className={textClass}>{btnTitle}</span>
      )}
      {iconPosition === "right" && icon && (
        <span className="pointer-events-none text-gray-600">{icon}</span>
      )}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
