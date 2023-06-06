import type { FC } from "react";
import Logo from "~/components/elements/Logo/Logo";
import DesktopNav from "~/components/elements/NavBar/DesktopNav";
import MobileNav from "~/components/elements/NavBar/MobileNav";
import useWindowSize from "~/hooks/useWindowSize";

export type LinkType = {
  href: string;
  label: string;
  public: boolean;
};

const LINKS: LinkType[] = [
  {
    href: "/",
    public: false,
    label: "Home",
  },
  {
    public: false,
    href: "/tournaments",
    label: "Tournaments",
  },
  {
    public: false,
    href: "/new-tournament",
    label: "New Tournament",
  },
];

const NavBar: FC = () => {
  const { windowSize } = useWindowSize();
  return (
    <nav className="relative z-20 flex items-center justify-between bg-slate-50 px-4 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:px-12 md:py-4">
      <Logo />

      {windowSize.width > 770 ? (
        <DesktopNav links={LINKS} />
      ) : (
        <MobileNav links={LINKS} />
      )}
    </nav>
  );
};

export default NavBar;
