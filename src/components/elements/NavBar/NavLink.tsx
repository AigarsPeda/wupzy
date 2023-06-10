import { type Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FC } from "react";
import { type LinkType } from "~/types/utils.types";
import classNames from "~/utils/classNames";

interface NavLinkProps {
  isFlex?: boolean;
  links: LinkType[];
  isSpaceY?: boolean;
  onLinkClick?: () => void;
  sessionData: Session | null;
}

const NavLink: FC<NavLinkProps> = ({
  links,
  isFlex,
  isSpaceY,
  sessionData,
  onLinkClick,
}) => {
  const router = useRouter();
  return (
    <ul
      className={classNames(
        isFlex && "flex",
        isSpaceY && "space-y-4",
        "items-center gap-8"
      )}
    >
      {links.map((link) => {
        if (link.label) {
          return (
            <li
              key={link.href}
              className={classNames(
                !link.public && !sessionData?.user ? "hidden" : "block"
              )}
            >
              <Link
                href={link.href}
                onClick={onLinkClick}
                className={classNames(
                  router.pathname === link.href
                    ? "text-gray-900 underline underline-offset-8"
                    : "text-slate-500 no-underline",
                  "font-semibold text-gray-800 transition-all hover:text-gray-900"
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavLink;
