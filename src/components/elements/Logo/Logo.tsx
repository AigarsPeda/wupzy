import Link from "next/link";
import type { FC } from "react";
import useWindowSize from "hooks/useWindowSize";

const Logo: FC = () => {
  const { windowSize } = useWindowSize();
  return (
    <Link href="/" className="font-koulen text-4xl text-gray-900">
      {windowSize.width && windowSize.width <= 400 ? "GT" : "Game Tracker"}
    </Link>
  );
};

export default Logo;
