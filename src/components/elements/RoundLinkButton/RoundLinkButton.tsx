import Link from "next/link";
import type { FC } from "react";
import { classNames } from "utils/classNames";

interface RoundLinkButtonProps {
  href: string;
  linkClassName?: string;
  bgColor?: "outline" | "violet";
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
        linkClassName ? linkClassName : "py-1.5 px-6",
        bgColor === "outline"
          ? "border-2 border-gray-800 bg-white text-gray-800 hover:shadow-gray-400"
          : "",
        bgColor === "violet"
          ? "bg-violet-500 text-white hover:shadow-violet-400"
          : "",
        "flex items-center justify-center rounded-md font-semibold tracking-wider transition-all duration-200 hover:scale-105 hover:shadow-md"
      )}
    >
      {linkTitle}
    </Link>
  );
};

export default RoundLinkButton;
