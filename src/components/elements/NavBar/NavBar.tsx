import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import AuthenticateUser from "~/components/elements/AuthenticateUser/AuthenticateUser";
import Logo from "~/components/elements/Logo/Logo";
import classNames from "../../../utils/classNames";

const LINKS = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/tournaments",
    label: "Tournaments",
  },
  // {
  //   href: "/terms-of-service",
  //   label: "Terms of Service",
  // },
];

const NavBar: FC = () => {
  const router = useRouter();

  return (
    <>
      <nav className="relative z-20 flex items-center justify-between bg-slate-50 px-4 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:px-12 md:py-4">
        <div className="flex">
          <Logo />
          <ul className="ml-8 items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classNames(
                    router.pathname === link.href
                      ? "text-gray-800 underline underline-offset-8"
                      : "text-gray-500 no-underline",
                    "font-semibold text-gray-800 transition-all"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex">
          <AuthenticateUser />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
