import Link from "next/link";
import type { FC } from "react";
import LogoMark from "~/components/elements/Logo/LogoMark";
import LogoMarkDesktop from "~/components/elements/Logo/LogoMarkDesktop";

const Logo: FC = () => {
  return (
    <Link
      href="/"
      className="font-koulen rounded-md bg-black text-4xl text-gray-900"
    >
      <div className="block md:hidden">
        <LogoMark className="h-11" />
      </div>

      <div className="hidden md:block">
        <LogoMarkDesktop className="h-9" />
      </div>
    </Link>
  );
};

export default Logo;
