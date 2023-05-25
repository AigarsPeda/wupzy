import MenuContainer from "components/containers/MenuContainer/MenuContainer";
import NewTournamentContainer from "components/containers/NewGameContainer/NewGameContainer";
import Logo from "components/elements/Logo/Logo";
import ProfileDropdown from "components/elements/ProfileDropdown/ProfileDropdown";
import RoundLinkButton from "components/elements/RoundLinkButton/RoundLinkButton";
import { ROUTES_WITHOUT_NAVBAR, ROUTES_WITH_MAIN_NAV } from "hardcoded";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "utils/api";
import classNames from "utils/classNames";

const NavBar: FC = () => {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { refetch } = api.users.getCurrentUser.useQuery(undefined, {
    retry: 0,
    onSuccess(data) {
      if (data.user) {
        setIsUser(true);
      }
    },
    onError() {
      setIsUser(false);
    },
  });

  const isMainNavBar = () => {
    return ROUTES_WITH_MAIN_NAV.includes(router.pathname);
  };

  useEffect(() => {
    // if page changed, refetch user data
    router.events.on("routeChangeComplete", () => {
      refetch().catch((err) => {
        console.error(err);
      });
    });
  }, [refetch, router.events]);

  if (ROUTES_WITHOUT_NAVBAR.includes(router.pathname)) return null;

  return (
    <>
      <nav className="relative z-20 flex items-center justify-between bg-slate-50 px-4 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:px-12 md:py-4">
        {isMainNavBar() ? (
          <>
            <Logo />
            {isUser ? (
              <RoundLinkButton href="/tournaments" linkTitle="Tournaments" />
            ) : (
              <RoundLinkButton href="/login" linkTitle="Login" />
            )}
          </>
        ) : (
          <>
            <MenuContainer />
            <Logo />
            <div className="flex">
              <NewTournamentContainer />
              {/* <ProfileDropdown /> */}
            </div>
          </>
        )}

        <div
          className={classNames(
            isDropdownOpen ? "translate-y-0" : "translate-y-[-9%]",
            "absolute left-0 right-0 top-20 z-[10] transition duration-300 ease-in-out "
          )}
        >
          <div
            className={classNames(
              isDropdownOpen ? "h-20" : "h-0",
              "h-20 w-full bg-black text-white shadow-sm outline-none transition-all duration-300 ease-in-out"
            )}
          >
            Test text{" "}
          </div>
          <div className="flex justify-end px-4 md:px-12">
            {/* <ProfileDropdown /> */}

            <button
              className="h-5 w-20 rounded-b-md bg-green-500 text-xs text-white"
              onClick={() => {
                setIsDropdownOpen((state) => !state);
              }}
            >
              Settings
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
