import LogoMark from "components/elements/Logo/LogoMark";
import useWindowSize from "hooks/useWindowSize";
import Link from "next/link";
import type { FC } from "react";

const Logo: FC = () => {
  const { windowSize } = useWindowSize();
  return (
    <Link
      href="/"
      className="overflow-hidden rounded-md bg-black font-koulen text-4xl text-gray-900"
    >
      {windowSize.width && windowSize.width <= 400 ? (
        <LogoMark className="h-auto w-14" />
      ) : (
        <LogoMark className="h-auto w-16" />
      )}
    </Link>
  );
};

export default Logo;
