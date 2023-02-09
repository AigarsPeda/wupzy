import Link from "next/link";
import type { FC } from "react";
import { classNames } from "utils/classNames";

interface RoundLinkButtonProps {
  href: string;
  linkClassName?: string;
  bgColor?: "outline" | "violet" | "black";
  linkTitle: string | JSX.Element;
}

const RoundLinkButton: FC<RoundLinkButtonProps> = ({
  href,
  linkTitle,
  linkClassName,
  bgColor = "outline",
}) => {
  return (
    <Link
      href={href}
      className={classNames(
        linkClassName ? linkClassName : "px-6",
        bgColor === "outline"
          ? "border-2 border-gray-800 bg-white hover:shadow-gray-400"
          : "",
        bgColor === "violet"
          ? "bg-violet-500 text-white hover:shadow-violet-400"
          : "",
        bgColor === "black" ? "bg-black text-white hover:shadow-gray-900" : "",
        "flex h-10 items-center justify-center rounded-md font-bold transition-all duration-200 hover:scale-105 hover:shadow-md"
      )}
    >
      {linkTitle}
    </Link>
  );
};

export default RoundLinkButton;
