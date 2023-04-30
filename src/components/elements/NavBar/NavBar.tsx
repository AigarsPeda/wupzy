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

const NavBar: FC = () => {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
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

  // const isIndexPage = () => router.pathname === "/";

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
    <nav className="flex items-center justify-between px-4 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:px-12 md:py-4">
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
            <ProfileDropdown />
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
