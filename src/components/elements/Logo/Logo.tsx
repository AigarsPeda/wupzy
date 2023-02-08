import Link from "next/link";
import type { FC } from "react";

const Logo: FC = () => {
  return (
    <Link href="/" className="font-koulen text-4xl font-bold tracking-wider">
      Game Tracker
    </Link>
  );
};

export default Logo;
