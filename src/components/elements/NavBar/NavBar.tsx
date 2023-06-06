import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import AuthenticateUser from "~/components/elements/AuthenticateUser/AuthenticateUser";
import Logo from "~/components/elements/Logo/Logo";
import classNames from "~/utils/classNames";

type LinkType = {
  href: string;
  label: string;
  public: boolean;
};

const LINKS: LinkType[] = [
  {
    href: "/",
    public: true,
    label: "Home",
  },
  {
    public: false,
    href: "/tournaments",
    label: "Tournaments",
  },
];

const NavBar: FC = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  return (
    <>
      <nav className="relative z-20 flex items-center justify-between bg-slate-50 px-4 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:px-12 md:py-4">
        <div className="flex">
          <Logo />
          <ul className="ml-8 items-center gap-8 md:flex">
            {LINKS.map((link) => {
              return (
                <li
                  key={link.href}
                  className={classNames(
                    !link.public && !sessionData?.user ? "hidden" : "block"
                  )}
                >
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
              );
            })}
          </ul>
        </div>

        <div className="flex">
          <AuthenticateUser sessionData={sessionData} status={status} />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
