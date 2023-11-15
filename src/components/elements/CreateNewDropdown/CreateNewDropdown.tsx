import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type FC } from "react";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import { type LinkType } from "~/types/utils.types";
import classNames from "~/utils/classNames";

interface CreateNewDropdownProps {
  links: LinkType[];
}

const CreateNewDropdown: FC<CreateNewDropdownProps> = ({ links }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Dropdown
      top="2.5"
      width="auto"
      isDropdownOpen={isDropdownOpen}
      dropdownBtn={
        <button
          className={classNames(
            links.some((link) => router.pathname === link.href)
              ? "text-gray-900 underline underline-offset-8"
              : "text-gray-900 no-underline",
            "flex items-center justify-center text-sm underline-offset-8 transition-all duration-200 ease-in-out hover:text-gray-900 hover:underline focus:ring-gray-800",
          )}
          onClick={() => {
            setIsDropdownOpen((state) => !state);
          }}
        >
          Create New
        </button>
      }
      handleDropdownClose={() => {
        setIsDropdownOpen(false);
      }}
    >
      <ul className="flex min-w-min flex-col justify-between gap-3 whitespace-nowrap px-5 py-3">
        {links.map((link) => {
          if (link.label) {
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                  className={classNames(
                    router.pathname === link.href
                      ? "text-gray-900 underline"
                      : "text-gray-900 no-underline",
                    "text-sm text-gray-800 underline-offset-4 transition-all duration-200 ease-in-out hover:text-gray-900 hover:underline focus:ring-gray-800",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </Dropdown>
  );
};

export default CreateNewDropdown;
