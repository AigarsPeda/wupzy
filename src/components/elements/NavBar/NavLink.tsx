import { type Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FC } from "react";
import CreateNewDropdown from "~/components/elements/CreateNewDropdown/CreateNewDropdown";
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
        "items-center gap-8",
      )}
    >
      {links.map((link) => {
        if (link.label && !link.isInDropdown) {
          return (
            <li
              key={link.href}
              className={classNames(
                !link.public && !sessionData?.user ? "hidden" : "block",
              )}
            >
              <Link
                href={link.href}
                onClick={onLinkClick}
                className={classNames(
                  router.pathname === link.href
                    ? "text-gray-900 underline"
                    : "text-gray-900 no-underline",
                  "text-sm text-gray-800 underline-offset-8 transition-all hover:text-gray-900 hover:underline focus:ring-gray-800",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        }
      })}

      <div className="hidden lg:block">
        <CreateNewDropdown links={links.filter((link) => link.isInDropdown)} />
      </div>

      <div className="block lg:hidden">
        {links
          .filter((link) => link.isInDropdown)
          .map((link) => {
            if (link.label) {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onLinkClick}
                    className={classNames(
                      router.pathname === link.href
                        ? "text-gray-900 underline"
                        : "text-gray-900 no-underline",
                      "text-sm text-gray-800 underline-offset-8 transition-all hover:text-gray-900 hover:underline focus:ring-gray-800",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            }
          })}
      </div>
    </ul>
  );
};

export default NavLink;
