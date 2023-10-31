import { LINKS, PAGES_WITHOUT_HEADER } from "hardcoded";
import { useRouter } from "next/router";
import { useEffect, useState, type FC } from "react";
import Logo from "~/components/elements/Logo/Logo";
import DesktopNav from "~/components/elements/NavBar/DesktopNav";
import MobileNav from "~/components/elements/NavBar/MobileNav";
import classNames from "~/utils/classNames";

const NavBar: FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const isNavBar = () => {
    return !PAGES_WITHOUT_HEADER.includes(router.pathname);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={classNames(
          isScrolled
            ? "bg-slate-50 shadow-[0_2px_5px_rgba(0,0,0,0.07)]"
            : "bg-gray-50",
          "top-0 z-[99] flex w-full items-center justify-between px-4 pb-0 pt-4 md:sticky md:px-12 md:py-2"
        )}
      >
        <Logo />
        {isNavBar() && (
          <>
            <div className="hidden w-full lg:block">
              <DesktopNav links={LINKS} />
            </div>

            <div className="w-full lg:hidden">
              <MobileNav links={LINKS} />
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;
