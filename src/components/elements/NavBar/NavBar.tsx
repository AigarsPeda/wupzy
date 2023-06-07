import { LINKS } from "hardcoded";
import type { FC } from "react";
import Logo from "~/components/elements/Logo/Logo";
import DesktopNav from "~/components/elements/NavBar/DesktopNav";
import MobileNav from "~/components/elements/NavBar/MobileNav";

const NavBar: FC = () => {
  return (
    <nav className="relative z-20 flex items-center justify-between bg-slate-50 px-4 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:px-12 md:py-4">
      <Logo />

      <div className="hidden w-full md:block">
        <DesktopNav links={LINKS} />
      </div>

      <div className="w-full md:hidden">
        <MobileNav links={LINKS} />
      </div>
    </nav>
  );
};

export default NavBar;
